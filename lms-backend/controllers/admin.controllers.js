import User from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import { razorpay } from "../server.js";

// Get all users with subscription and revenue details (payments from Razorpay)
export const getUsersStatsData = async (req, res, next) => {
  try {
    // Fetch all users (excluding passwords)
    const allUsers = await User.find({}).select("-password");

    if (!allUsers) {
      return next(new AppError("Unable to fetch users", 400));
    }

    // Get subscription data for each user
    const usersWithDetails = allUsers.map((user) => ({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      subscription: {
        id: user.subscription.id,
        status: user.subscription.status,
      },
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    // Count subscription statistics
    const activeSubscriptions = allUsers.filter(
      (user) => user.subscription.status === "active"
    ).length;
    const inactiveSubscriptions = allUsers.filter(
      (user) => user.subscription.status === "inactive"
    ).length;

    // Fetch all payments from Razorpay with pagination
    const allPayments = [];
    const now = Math.floor(Date.now() / 1000);
    const oneYearAgo = now - 365 * 24 * 60 * 60; // Default to 1 year ago
    let skip = 0;
    const count = 100;

    while (true) {
      const response = await razorpay.payments.all({
        from: oneYearAgo,
        to: now,
        count,
        skip,
      });
      const items = response.items || [];
      allPayments.push(...items);
      if (items.length < count) break;
      skip += count;
    }

    // Build monthly sales record aligned with frontend: ["Jan", "Feb", "Mar", ...]
    const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthlySalesRecord = MONTH_NAMES.map((month, index) => ({
      month,
      totalSales: 0,
      revenue: 0,
    }));

    for (const p of allPayments) {
      if (!p.created_at) continue;
      const d = new Date(p.created_at * 1000);
      const monthIndex = d.getMonth(); // 0-11
      monthlySalesRecord[monthIndex].totalSales += 1;
      const netAmount = (p.amount || 0) - (p.amount_refunded || 0);
      if (["captured", "authorized"].includes(p.status)) {
        monthlySalesRecord[monthIndex].revenue += netAmount / 100; // paise to rupees
      }
    }

    // Calculate total revenue
    const totalRevenuePaise = allPayments.reduce((sum, p) => {
      if (!["captured", "authorized"].includes(p.status)) return sum;
      return sum + (p.amount || 0) - (p.amount_refunded || 0);
    }, 0);
    const totalRevenue = totalRevenuePaise / 100; // convert paise to rupees

    // Chart-ready: array of numbers (one per month Jan–Dec) for bar charts
    const monthlySalesData = monthlySalesRecord.map((m) => m.totalSales);

    // Response data
    res.status(200).json({
      success: true,
      message: "User stats fetched successfully",
      data: {
        totalUsers: allUsers.length,
        totalActiveSubscriptions: activeSubscriptions,
        totalInactiveSubscriptions: inactiveSubscriptions,
        totalRevenue,
        totalTransactions: allPayments.length,
        allPayments,
        monthlySalesRecord,
        monthlySalesData,
        users: usersWithDetails,
      },
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
