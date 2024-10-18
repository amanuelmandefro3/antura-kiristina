import express from 'express';
import { createBlog, getAllBlogs, getBlogById, searchBlogs, editBlog, deleteBlog } from './../controllers/blog.controllers.js';
import upload from '../uploads/uploadConfig.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API for managing blogs
 */

/**
 * @swagger
  * /blogs/create:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Title of the blog (min: 5, max: 100)"
 *               content:
 *                 type: string
 *                 description: "Content of the blog (min: 10)"
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *                 description: "Optional image for the blog"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 collectionFormat: multi
 *                 description: "Tags for the blog (optional)"
 *     responses:
 *       200:
 *         description: Blog created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */

router.post('/create', upload.single('imageUrl'), createBlog);

/**
 * @swagger
* /blogs:
*   get:
*     summary:  Get all blogs
*     tags: [Blogs]
*     responses:
*       200:
*         description: Blogs retrieved successfully
*       400: 
*         description: No blogs found
*       500:    
*         description: Internal server error
*     
*/
router.get('/', getAllBlogs);

/**
 * @swagger
 * /blogs/search:
 *   get:
 *     summary: Search for blogs by title or content
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query
 *     responses:
 *       200:
 *         description: Blogs matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   content:
 *                     type: string
 *                   imageUrl:
 *                     type: string
 *                   tags:
 *                     type: array
 *                     items:
 *                       type: string
 *       400:
 *         description: No search query provided
 *       500:
 *         description: Internal server error
 */
router.get('/search', searchBlogs);

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getBlogById);

/**
 * @swagger
 * /blogs/update/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: "Title of the blog (min: 5, max: 100)"
 *               content:
 *                 type: string
 *                 description: "Content of the blog (min: 10)"
 *               imageUrl:
 *                 type: string
 *                 format: binary
 *                 description: Optional image for the blog
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags for the blog
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.put('/update/:id',upload.single('imageUrl'), editBlog);

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', deleteBlog);

export default router;
