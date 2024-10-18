import express from 'express';
import {
  registerAdmin,
  verifyEmail,
  loginAdmin,
  logoutAdmin,
  forgotAdminPassword,
  resetAdminPassword,
  refreshToken,
} from '../controllers/adminController.js';

const router = express.Router();

// Swagger Documentation (Ensure to add this on top)
 /**
 * @swagger
 * tags:
 *   name: Admin
 *   description: API for managing Admin operations
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [Admin]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Admin's name (min: 5, max: 50)"
 *               email:
 *                 type: string
 *                 description: "Admin's email"
 *               password:
 *                 type: string
 *                 description: "Admin's password (min: 8 characters, must include one lowercase letter, one uppercase letter, one number, and one special character)"
 *     responses:
 *       200:
 *         description: Admin registered successfully
 *       400:
 *         description: Admin already exists or invalid input
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerAdmin);

/**
 * @swagger
 * /admin/verify-email:
 *   post:
 *     summary: Verify email with code
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *             properties:
 *               code:
 *                 type: string
 *                 description: "Verification code sent to the email"
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired verification code
 *       500:
 *         description: Internal server error
 */
router.post('/verify-email', verifyEmail);

/**
 * @swagger
 * /admin/login:
 *   post:
 *     summary: Admin login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: "Admin's email"
 *               password:
 *                 type: string
 *                 description: "Admin's password"
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
router.post('/login', loginAdmin);

/**
 * @swagger
 * /admin/logout:
 *   post:
 *     summary: Admin logout
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Admin logged out successfully
 *       500:
 *         description: Internal server error
 */
router.post('/logout', logoutAdmin);

/**
 * @swagger
 * /admin/forgot-password:
 *   post:
 *     summary: Request a password reset link
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Admin's email for password reset
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *       400:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */
router.post('/forgot-password', forgotAdminPassword);

/**
 * @swagger
 * /admin/reset-password/{token}:
 *   post:
 *     summary: Reset password with token
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Password reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: "New password (min: 8 characters, must include one lowercase letter, one uppercase letter, one number, and one special character)"
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired reset token
 *       500:
 *         description: Internal server error
 */
router.post('/reset-password/:token', resetAdminPassword);

/**
 * @swagger
 * /admin/refresh-token:
 *   post:
 *     summary: Refresh access token using a refresh token
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: "Refresh token to generate a new access token"
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *       401:
 *         description: Access denied, token missing
 *       500:
 *         description: Internal server error
 */
router.post('/refresh-token', refreshToken);

export default router;
