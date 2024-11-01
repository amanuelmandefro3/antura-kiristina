import express from 'express';
import { registerStudent, getStudents } from '../controllers/student.controllers.js';

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
 *               - fullName
 *               - age
 *               - email
 *               - churchName
 *               - address
 *               - familyMemberName
 *               - familyPhoneNumber
 *               - q1
 *               - q2
 *               - q3
 *               - q4
 *               - q5
 *               - q6
 *               - q7
 *               - q8
 *               - q9
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: "Student's full name (min: 3, max: 50)"
 *               age:
 *                 type: number
 *                 description: "Student's age (min: 12, max: 18)"
 *               phoneNumber:
 *                 type: string
 *                 description: "Student's phone number (optional)"
 *               email:
 *                 type: string
 *                 description: "Student's email address"
 *               churchName:
 *                 type: string
 *                 description: "Church the student belongs to (min: 3, max: 100)"
 *               address:
 *                 type: string
 *                 description: "Student's address (min: 5, max: 200)"
 *               familyMemberName:
 *                 type: string
 *                 description: "Family member's name (min: 3, max: 50)"
 *               familyPhoneNumber:
 *                 type: string
 *                 description: "Family member's phone number"
 *               q1:
 *                 type: string
 *                 description: "Response to question 1 (min: 1, max: 1000)"
 *               q2:
 *                 type: string
 *                 description: "Response to question 2 (min: 1, max: 1000)"
 *               q3:
 *                 type: string
 *                 description: "Response to question 3 (min: 1, max: 1000)"
 *               q4:
 *                 type: string
 *                 description: "Response to question 4 (min: 1, max: 1000)"
 *               q5:
 *                 type: string
 *                 description: "Response to question 5 (min: 1, max: 1000)"
 *               q6:
 *                 type: string
 *                 description: "Response to question 6 (min: 1, max: 1000)"
 *               q7:
 *                 type: string
 *                 description: "Response to question 7 (min: 1, max: 1000)"
 *               q8:
 *                 type: string
 *                 description: "Response to question 8 (min: 1, max: 1000)"
 *               q9:
 *                 type: string
 *                 description: "Response to question 9 (min: 1, max: 1000)"
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
 *     summary: Get a paginated list of all registered students
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of students per page
 *     responses:
 *       200:
 *         description: A paginated list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fullName:
 *                         type: string
 *                       age:
 *                         type: number
 *                       phoneNumber:
 *                         type: string
 *                       email:
 *                         type: string
 *                       churchName:
 *                         type: string
 *                       address:
 *                         type: string
 *                       familyMemberName:
 *                         type: string
 *                       familyPhoneNumber:
 *                         type: string
 *                       q1:
 *                         type: string
 *                       q2:
 *                         type: string
 *                       q3:
 *                         type: string
 *                       q4:
 *                         type: string
 *                       q5:
 *                         type: string
 *                       q6:
 *                         type: string
 *                       q7:
 *                         type: string
 *                       q8:
 *                         type: string
 *                       q9:
 *                         type: string
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalStudents:
 *                   type: integer
 *       500:
 *         description: Internal server error
 */
router.get('/', getStudents);

export default router;
