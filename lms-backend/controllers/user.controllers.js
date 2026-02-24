import User from '../models/user.model.js';
import AppError from '../utils/error.util.js';
import cloudinary from 'cloudinary';
import crypto from 'crypto';
import fs from 'fs/promises';
import sendEmail from '../utils/sendEmail.js';

const cookieOptions = {
  maxAge: 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  secure: true,
  sameSite: "none"
};

const register = async (req, res, next) => {

  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  };

  const userExist = await User.findOne({ email });

  if (userExist) {
    return next(new AppError("User already exist", 400));
  };

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      public_id: "sample_id",
      secure_url: "sample_url"
    }
  });

  if (!user) {
    return next(new AppError("User registration failed , please try again", 400));
  }

  if (req.file) {

    console.log(JSON.stringify(req.file))

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        crop: "fill",
        gravity: "faces"
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;


        // remove file from local server
        fs.rm(`uploads/${req.file.filename}`).catch(err => console.log(err));
      };
    } catch (error) {
      console.log(error.message)
      return next(new AppError(error.message || "something went wrong , try again", 500));
    }
  }

  console.log('here')

  await user.save();

  user.password = undefined;

  const token = await user.generateJWTToken();

  res.cookie("token", token, cookieOptions);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user
  });
};

const login = async (req, res, next) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("All fields are required", 400));
    }


    const user = await User.findOne({ email }).select("+password");

    console.log(user);
    if (!user || !(await user.comparePassword(password))) {
      return next(new AppError("email or password does not match", 400));
    }

    const token = await user.generateJWTToken();
    user.password = undefined;


    res.cookie("token", token, cookieOptions);
    console.log(res.cookie);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user
    });

  } catch (error) {

    return next(new AppError(error.message, 500));
  }
};

const logout = (req, res) => {
  res.cookie("token", null, { secure: true, httpOnly: true, maxAge: 0 });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

const getProfile = async (req, res, next) => {

  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    res
      .status(200)
      .json({
        success: true,
        message: "User profile fetched successfully",
        user
      })
  } catch (error) {
    return next(new AppError(error.message, 500));
  }

};

const forgotPassword = async (req, res, next) => {

  const { email } = req.body;

  if (!email) {
    return next(new AppError("Email is required", 400))
  };

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("User not found", 400));
  };

  const resetToken = await user.generatePasswordResetToken();

  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  console.log(resetUrl);

  const subject = "Password Reset Request";
  const message = `
    <h2>Password Reset Request</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetUrl}" target="_blank" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
    <p style="margin-top: 20px; color: #888; font-size: 12px;">If you did not request this, please ignore this email.</p>
  `;
  try {
    await sendEmail(email, subject, message, true);

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();
    return next(new AppError(error.message, 500));
  }
};

const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Invalid or expired token", 400));
  }

  user.password = password;

  console.log(user.password)
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
};

const changePassword = async (req, res, next) => {

  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;

  if (!oldPassword || !newPassword) {
    return next(new AppError("All fields are required", 400));
  }

  const user = await User.findById(id).select("+password");

  if (!user) {
    return next(new AppError("User not found", 400));
  }

  if (!(await user.comparePassword(oldPassword))) {
    return next(new AppError("Old password is incorrect", 400));
  }

  user.password = newPassword;
  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
};


const updateProfile = async (req, res, next) => {

  const { fullName } = req.body;
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User not found", 400));
  }

  if (fullName) {
    user.fullName = fullName;
  }

  if (req.file) {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        width: 250,
        height: 250,
        crop: "fill",
        gravity: "faces"
      });

      if (result) {
        user.avatar.public_id = result.public_id;
        user.avatar.secure_url = result.secure_url;


        // remove file from local server
        fs.rm(`uploads/${req.file.filename}`).catch(err => console.log(err));
      };
    } catch (error) {
      return next(new AppError(error.message || "File not uploaded , try again .", 500));
    }
  }


}

export { register, login, logout, getProfile, forgotPassword, resetPassword, changePassword, updateProfile };