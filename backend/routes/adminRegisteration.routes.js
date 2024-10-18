import express from 'express';
import { registerAdmin, getAllAdmins } from '../controllers/adminRegistration.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: AdminsRegistration
 *   description: API for managing Admin registrations
 */

/**
 * @swagger
 * /admin/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [AdminsRegistration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - age
 *               - PhoneNumber
 *               - churchName
 *               - address
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the admin (min: 5, max: 100 characters)"
 *               email:
 *                 type: string
 *                 description: "Email of the admin"
 *               age:
 *                 type: number
 *                 description: "Age of the admin (must be 18 or older)"
 *               PhoneNumber:
 *                 type: string
 *                 description: "Phone number of the admin"
 *               churchName:
 *                 type: string
 *                 description: "Name of the church admin is associated with (min: 5, max: 100 characters)"
 *               address:
 *                 type: string
 *                 description: "Address of the admin (min: 5, max: 100 characters)"
 *     responses:
 *       201:
 *         description: Admin registered successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerAdmin);

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Get a list of all registered admins
 *     tags: [AdminsRegistration]
 *     responses:
 *       200:
 *         description: List of registered admins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   age:
 *                     type: number
 *                   PhoneNumber:
 *                     type: string
 *                   churchName:
 *                     type: string
 *                   address:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllAdmins);

export default router;
