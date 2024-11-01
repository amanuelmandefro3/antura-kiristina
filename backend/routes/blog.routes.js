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
 *     summary: Retrieve paginated list of blogs
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve (default is 1).
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of blogs per page (default is 10).
 *     responses:
 *       200:
 *         description: Blogs retrieved successfully with pagination.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates successful response.
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number.
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages.
 *                 totalBlogs:
 *                   type: integer
 *                   description: Total number of blogs.
 *       400:
 *         description: Bad request, invalid parameters.
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllBlogs);


/**
 * @swagger
 * /blogs/search:
 *   get:
 *     summary: Search for blogs by title or content with pagination
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query to filter blogs by title or content.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: The page number to retrieve. Defaults to 1.
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           default: 10
 *         required: false
 *         description: Number of blogs per page. Defaults to 10.
 *     responses:
 *       200:
 *         description: Blogs matching the search query with pagination.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates successful response.
 *                   example: true
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the blog.
 *                         example: "60d21b4667d0d8992e610c85"
 *                       title:
 *                         type: string
 *                         description: Title of the blog.
 *                         example: "Understanding Node.js Pagination"
 *                       content:
 *                         type: string
 *                         description: Content of the blog.
 *                         example: "This blog post covers pagination in Node.js..."
 *                       imageUrl:
 *                         type: string
 *                         nullable: true
 *                         description: URL to the blog image.
 *                         example: "http://example.com/image.jpg"
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Tags associated with the blog.
 *                         example: ["Node.js", "Pagination"]
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number.
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages available.
 *                   example: 5
 *                 totalBlogs:
 *                   type: integer
 *                   description: The total number of blogs matching the search query.
 *                   example: 50
 *       400:
 *         description: Bad request, usually when the search query is not provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No search query provided"
 *       500:
 *         description: Internal server error, such as when an error occurs during search.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error searching blogs: <error message>"
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
