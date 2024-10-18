import express from 'express';
import { registerStudent, getStudents } from '../controllers/studentControllers.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API for managing student operations
 */

/**
 * @swagger
 * /student/register:
 *   post:
 *     summary: Register a new student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - age
 *               - email
 *               - churchName
 *               - address
 *               - familyMembersName
 *               - familyMembersPhoneNum
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Student's name (min: 3, max: 50)"
 *               age:
 *                 type: number
 *                 description: "Student's age (min: 12, max: 18)"
 *               phoneNum:
 *                 type: string
 *                 description: "Student's phone number (optional)"
 *               email:
 *                 type: string
 *                 description: "Student's email address"
 *               churchName:
 *                 type: string
 *                 description: "Church the student belongs to"
 *               address:
 *                 type: string
 *                 description: "Student's address"
 *               familyMembersName:
 *                 type: string
 *                 description: "Family member's name"
 *               familyMembersPhoneNum:
 *                 type: string
 *                 description: "Family member's phone number"
 *     responses:
 *       200:
 *         description: Student registered successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerStudent);

/**
 * @swagger
 * /student:
 *   get:
 *     summary: Get a list of all registered students
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   age:
 *                     type: number
 *                   phoneNum:
 *                     type: string
 *                   email:
 *                     type: string
 *                   churchName:
 *                     type: string
 *                   address:
 *                     type: string
 *                   familyMembersName:
 *                     type: string
 *                   familyMembersPhoneNum:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
router.get('/', getStudents);

export default router;
