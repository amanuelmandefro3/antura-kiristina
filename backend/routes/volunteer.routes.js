import express from 'express';
import { registerVolunteer, getAllVolunteers } from '../controllers/volunteer.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: VolunteerRegistration
 *   description: API for managing volunteer registrations
 */

/**
 * @swagger
 * /volunteer/register:
 *   post:
 *     summary: Register a new volunteer
 *     tags: [VolunteerRegistration]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - age
 *               - address
 *               - phoneNumber
 *               - email
 *               - residentialAddress
 *               - educationLevel
 *               - employmentStatus
 *               - church
 *               - serviceAreas
 *               - availabilityFrequency
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: "Full name of the volunteer (min: 5, max: 100 characters)"
 *               age:
 *                 type: number
 *                 description: "Age category of the volunteer"
 *               address:
 *                 type: string
 *                 description: "Address of the volunteer (min: 5, max: 100 characters)"
 *               phoneNumber:
 *                 type: string
 *                 description: "Phone number of the volunteer (min: 10, max: 15 characters)"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: "Email of the volunteer"
 *               residentialAddress:
 *                 type: string
 *                 description: "Residential address of the volunteer (min: 5, max: 100 characters)"
 *               educationLevel:
 *                 type: string
 *                 description: "Education level of the volunteer"
 *               employmentStatus:
 *                 type: string
 *                 description: "Employment status of the volunteer"
 *               church:
 *                 type: string
 *                 description: "Church associated with the volunteer (min: 5, max: 100 characters)"
 *               serviceAreas:
 *                 type: string
 *                 enum: [Social Media, Teaching, Counseling, Mentoring, Fundraising, Where I am assigned, Event Planning, Other]
 *                 description: "Service areas where the volunteer is willing to assist"
 *               socialMedia:
 *                 type: string
 *                 description: "Optional social media link of the volunteer"
 *               availabilityFrequency:
 *                 type: string
 *                 enum: [onceAWeek, twiceAWeek, asNeeded]
 *                 description: "Frequency of volunteer availability"
 *     responses:
 *       201:
 *         description: Volunteer registered successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post('/register', registerVolunteer);

/**
 * @swagger
 * /volunteer:
 *   get:
 *     summary: Get a paginated list of all registered volunteers
 *     tags: [VolunteerRegistration]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination (defaults to 1)
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of volunteers per page (defaults to 10)
 *     responses:
 *       200:
 *         description: List of registered volunteers with pagination info
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
 *                         type: string
 *                         enum: [under20, 20to30, over30]
 *                       address:
 *                         type: string
 *                       phoneNumber:
 *                         type: string
 *                       email:
 *                         type: string
 *                         format: email
 *                       residentialAddress:
 *                         type: string
 *                       educationLevel:
 *                         type: string
 *                       employmentStatus:
 *                         type: string
 *                       church:
 *                         type: string
 *                       serviceAreas:
 *                         type: array
 *                         items:
 *                           type: string
 *                       socialMedia:
 *                         type: string
 *                       availabilityFrequency:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available
 *                 currentPage:
 *                   type: integer
 *                   description: Current page number
 *                 totalVolunteers:
 *                   type: integer
 *                   description: Total number of volunteers
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllVolunteers);

export default router;
