import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";
import crypto from "crypto";
import { razorpay } from "../server.js";
import AppError from "../utils/error.util.js";


const getRazorpayKey = async (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID
    });
};


const buySubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      console.log("Unauthorized , please login");
      return next(new AppError("Unauthorized , please login", 400));
    };

    if (user.role == 'ADMIN') {
      console.log("Admins can't buy subscriptions");
      return next(new AppError("Admins can't buy subscriptions", 400));
    };

    const subscription = await razorpay.subscriptions.create({
      plan_id: process.env.RAZORPAY_PLAN_ID,
      customer_notify: 1,
      total_count: 12 // 12 monthly billing cycles (1 year)
    });
    console.log(user);
    user.subscription.id = subscription.id;
    user.subscription.status = subscription.status;
    await user.save();

    res.status(200).json({
      success: true,
      Message: "Subscribed successfully",
      subscriptionId: subscription.id
    });
  } catch (error) {
    console.error("Subscription error:", error);
    return next(new AppError(error.message || "Failed to create subscription", 400));
  }
};

const verifySubscription = async (req, res, next) => {

  const { id } = req.user;
  const { razorpay_payment_id, razorpay_subscription_id, razorpay_signature } = req.body;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("Unauthorized , please login", 400));
  };

  const subscriptionId = user.subscription.id;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_payment_id + "|" + subscriptionId)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return next(new AppError("Invalid signature", 400));
  };


  await Payment.create({
    razorpay_payment_id,
    razorpay_subscription_id,
    razorpay_signature
  });

  user.subscription.status = "active";
  await user.save();

  res.status(200).json({
    success: true,
    message: "Subscription verified successfully"
  });

};

const cancelSubscription = async (req, res, next) => {

  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Unauthorized , please login", 400));
    }

    if (user.role == 'ADMIN') {
      return next(new AppError("Admins can't cancel subscriptions", 400));
    }

    const subscriptionId = user.subscription.id;

    const response = await razorpay.subscriptions.cancel(subscriptionId);

    user.subscription.status = "cancelled";

    await user.save();

    res.status(200).json({
      success: true,
      message: "Subscription cancelled successfully"
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getAllSubscriptions = async (req, res, next) => {
  try {
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

    for (const payment of allPayments) {
      if (!payment.created_at) continue;

      const date = new Date(payment.created_at * 1000);

      const monthIndex = date.getMonth(); // 0-11

      monthlySalesRecord[monthIndex].totalSales += 1;
      const netAmount = (payment.amount || 0) ;

      if (["captured", "authorized"].includes(payment.status)) {
        monthlySalesRecord[monthIndex].revenue += netAmount / 100; // paise to rupees
      }
    }

    // Calculate total revenue
    const totalRevenuePaise = allPayments.reduce((acc, curr) => {
      if (!["captured", "authorized"].includes(curr.status)) return acc;
      return acc + (curr.amount || 0) ;
    }, 0);
    const totalRevenue = totalRevenuePaise / 100; // convert paise to rupees

    // Chart-ready: array of numbers (one per month Jan–Dec) for bar charts
    const monthlySalesData = monthlySalesRecord.map((month) => month.totalSales);

    res.status(200).json({
      success: true,
      allPayments,
      monthlySalesRecord,
      monthlySalesData,
      totalRevenue,
    });
  } catch (error) {
    return next(new AppError(error.message || "Failed to fetch subscriptions", 500));
  }
};


export { 
  getRazorpayKey, 
  buySubscription, 
  verifySubscription, 
  cancelSubscription, 
  getAllSubscriptions
};