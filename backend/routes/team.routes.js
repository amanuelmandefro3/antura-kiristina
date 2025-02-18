import express from 'express';
import { upload } from '../config/multer.js';
import {
    createTeamMember,
    getAllTeamMembers,
    getTeamMember,
    updateTeamMember,
    deleteTeamMember
} from '../controllers/team.controller.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Team
 *   description: API for managing team members
 */

/**
 * @swagger
 * /team:
 *   post:
 *     summary: Create a new team member
 *     tags: [Team]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - role
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Team member's name (min: 2, max: 100)"
 *               role:
 *                 type: string
 *                 description: "Team member's role (min: 2, max: 100)"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: "Team member's image"
 *     responses:
 *       201:
 *         description: Team member created successfully
 *       400:
 *         description: Invalid input or missing image
 *       500:
 *         description: Internal server error
 */
router.post('/', upload.single('image'), createTeamMember);

/**
 * @swagger
 * /team:
 *   get:
 *     summary: Get all team members
 *     tags: [Team]
 *     responses:
 *       200:
 *         description: List of all team members
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllTeamMembers);

/**
 * @swagger
 * /team/{id}:
 *   get:
 *     summary: Get a team member by ID
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team member ID
 *     responses:
 *       200:
 *         description: Team member details
 *       404:
 *         description: Team member not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getTeamMember);

/**
 * @swagger
 * /team/{id}:
 *   put:
 *     summary: Update a team member
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team member ID
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Team member's name (min: 2, max: 100)"
 *               role:
 *                 type: string
 *                 description: "Team member's role (min: 2, max: 100)"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: "Team member's new image (optional)"
 *     responses:
 *       200:
 *         description: Team member updated successfully
 *       404:
 *         description: Team member not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', upload.single('image'), updateTeamMember);

/**
 * @swagger
 * /team/{id}:
 *   delete:
 *     summary: Delete a team member
 *     tags: [Team]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Team member ID
 *     responses:
 *       200:
 *         description: Team member deleted successfully
 *       404:
 *         description: Team member not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteTeamMember);

export default router; 