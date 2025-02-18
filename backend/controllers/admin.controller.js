import { Admin } from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
// import { emailerTransporter } from "../Email/email.config.js";
import dotenv from "dotenv";
import crypto from "crypto";
dotenv.config();
import { z } from "zod";

import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
} from "../Email/email.js";

import { generateToken } from "../utils/generateTokenAndSetCookie.js";

// create zod vaalidation schema for the following admin fields: name, email, password

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
const adminSchema = z.object({
  name: z.string().min(5).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      passwordRegex,
      "Password must contain at least one lowercase letter, one uppercase letter, one number and one special character"
    ),
});

export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // validate the request body
    adminSchema.parse(req.body);
    let admin = await Admin.findOne({ email });
    if (admin) {
      return res
        .status(400)
        .json({ success: false, msg: "Admin already exists with this email" });
    }
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    admin = new Admin({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpireAt: Date.now() + 600000, // 10 minutes
    });
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    
    // Generate token
    const accessToken = generateToken({ id: admin.id });
    
    // send verification email
    await sendVerificationEmail(email, verificationToken);
    await admin.save();

    res.status(200).json({ 
      success: true, 
      msg: "Admin registered successfully",
      accessToken,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      }
    });
  } catch (errors) {
    // handle zod validation errors
    if (errors instanceof z.ZodError) {
      return res.status(400).json({ success: false, errors: errors.errors });
    }
    console.error(errors);
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const admin = await Admin.findOne({
      verificationToken: code,
      verificationTokenExpireAt: { $gt: Date.now() },
    });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid or expired verification code" });
    }

    console.log(admin);
    
    await sendWelcomeEmail(admin.email, admin.name);
    admin.verified = true;
    admin.verificationToken = undefined;
    admin.verificationTokenExpireAt = undefined;
    await admin.save();


    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      admin: {
        ...admin._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, msg: "Internal server error from here" });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    let admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }
    
    // Generate token and return it in response
    const accessToken = generateToken({ id: admin.id });
    
    res.status(200).json({ 
      success: true, 
      msg: "Admin logged in successfully",
      accessToken,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

// export const logoutAdmin = async (req, res) => {
//   // Since we're not using cookies anymore, this endpoint just sends success response
//   res.status(200).json({ success: true, msg: "Admin logged out successfully" });
// };

export const forgotAdminPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, msg: "Admin not found with this email" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    await sendPasswordResetEmail(
      email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
    const resetTokenExpireAt = Date.now() + 3600000; // 1 hour
    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpireAt = resetTokenExpireAt;
    await admin.save();


    res
      .status(200)
      .json({ success: true, msg: "Password reset link sent to your email" });
  } catch (error) {}
};

export const resetAdminPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const admin = await Admin.findOne({
      resetPasswordToken: token,
      resetPasswordExpireAt: { $gt: Date.now() },
    });
    if (!admin) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid or expired reset token" });
    }
    // Hash the password
    await sendPasswordResetSuccessEmail(admin.email)
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    admin.save();
    res.status(200).json({ success: true, msg: "Password reset successful" });
  } catch (error) {}
};
