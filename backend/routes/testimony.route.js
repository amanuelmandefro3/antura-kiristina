import express from "express";
import upload from "../uploads/uploadConfig.js";
import {
  createTestimony,
  getAllTestimonies,
  getTestimonyById,
  editTestimony,
  deleteTestimony,
} from "../controllers/testimony.controllers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Testimonies
 *   description: API for managing testimonies
 */

/**
 * @swagger
 * /testimonies/create:
 *   post:
 *     summary: Create a new testimony
 *     tags: [Testimonies]
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
 *               - content
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Name of the person giving the testimony (min: 5, max: 100)"
 *               content:
 *                 type: string
 *                 description: "Content of the testimony (min: 10)"
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *                 description: "Optional image for the testimony"
 *     responses:
 *       201:
 *         description: Testimony created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/create", upload.single("imageUrl"), createTestimony);

/**
 * @swagger
 * /testimonies:
 *   get:
 *     summary: Get all testimonies
 *     tags: [Testimonies]
 *     responses:
 *       200:
 *         description: Testimonies retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   content:
 *                     type: string
 *                   imageUrl:
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
router.get("/", getAllTestimonies);

/**
 * @swagger
 * /testimonies/{id}:
 *   get:
 *     summary: Get a testimony by ID
 *     tags: [Testimonies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Testimony ID
 *     responses:
 *       200:
 *         description: Testimony details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 content:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Testimony not found
 *       500:
 *         description: Internal server error
 */
router.get("/:id", getTestimonyById);

/**
 * @swagger
 * /testimonies/update/{id}:
 *   put:
 *     summary: Update a testimony by ID
 *     tags: [Testimonies]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Testimony ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Updated name (optional)"
 *               content:
 *                 type: string
 *                 description: "Updated content (optional)"
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *                 description: "Optional updated image"
 *     responses:
 *       200:
 *         description: Testimony updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Testimony not found
 *       500:
 *         description: Internal server error
 */
router.put("/update/:id", upload.single("imageUrl"), editTestimony);

/**
 * @swagger
 * /testimonies/{id}:
 *   delete:
 *     summary: Delete a testimony by ID
 *     tags: [Testimonies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Testimony ID
 *     responses:
 *       200:
 *         description: Testimony deleted successfully
 *       404:
 *         description: Testimony not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", deleteTestimony);

export default router;
