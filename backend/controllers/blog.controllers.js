import { Blog } from "../models/Blog.js"
import { z } from "zod"
import mongoose from "mongoose"

// Updated Zod validation schema
const blogSchema = z.object({
  title: z.string().min(5).max(100),
  content: z.string().min(10),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().min(1),
})

const blogUpdateSchema = z.object({
  title: z.string().min(5).max(100).optional(),
  content: z.string().min(10).optional(),
  imageUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().min(1).optional(),
})

export const createBlog = async (req, res) => {
  const { title, content, tags, author } = req.body
  let tags_array = []
  if (typeof tags === "string") {
    tags_array = tags.split(",").map((tag) => tag.trim()) || []
  } else if (Array.isArray(tags)) {
    tags_array = tags
  }

  const imageUrl = req.file ? req.file.path : req.body.imageUrl || null

  try {
    blogSchema.parse({ ...req.body, tags: tags_array }) // Validate the request body
    const blog = new Blog({
      title,
      content,
      imageUrl,
      tags: tags_array,
      author,
    })

    await blog.save()
    res.status(201).json({ success: true, blog })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, msg: error.message })
  }
}

export const editBlog = async (req, res) => {
  const { id } = req.params
  const { title, content, tags, author} = req.body
  const imageUrl = req.file ? req.file.path : req.body.imageUrl || null

  let tags_array = []
  if (typeof tags === "string") {
    tags_array = tags.split(",").map((tag) => tag.trim()) || []
  } else if (Array.isArray(tags)) {
    tags_array = tags
  }

  try {
    // Validate the update input
    blogUpdateSchema.parse({ ...req.body, tags: tags_array })

    // Find the blog by ID
    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).json({ success: false, message: `Blog with id ${id} not found` })
    }

    // Update fields if they are provided
    blog.title = title || blog.title
    blog.content = content || blog.content
    blog.imageUrl = imageUrl || blog.imageUrl
    blog.tags = tags_array || blog.tags
    blog.author = author || blog.author

    // Save the updated blog
    const updatedBlog = await blog.save()

    res.status(200).json({ success: true, blog: updatedBlog })
  } catch (error) {
    console.error(error)
    res.status(400).json({ success: false, message: error.message })
  }
}

export const getAllBlogs = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const size = parseInt(req.query.size) || 10; // Default to 10 items per page if not provided
  try {
    // Count total documents
    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / size);

    // Fetch paginated blogs
    const blogs = await Blog.find().sort({ createdAt: -1 })
      .skip((page - 1) * size) // Skip the appropriate number of documents
      .limit(size); // Limit the result to the specified page size

    res.status(200).json({
      success: true,
      data: blogs,
      currentPage: page,
      totalPages,
      totalBlogs,
    });
  } catch (error) {
    res.status(500).json({ message: `Error fetching blogs: ${error.message}` });
  }
};

export const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid blog ID format" });
    }

    const blog = await Blog.findById(id);
    if (!blog) return res.status(404).json({ message: `Blog with id ${id} not found` });

    return res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `Error fetching blog: ${error.message}` });
  }
};

export const searchBlogs = async (req, res) => {
    const { query } = req.query;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const size = parseInt(req.query.size) || 10; // Default to 10 items per page if not provided
  
    if (!query) {
      return res.status(400).json({
        success: false,
        message: "No search query provided",
      });
    }
  
    try {
      // Perform full-text search with pagination
      const blogs = await Blog.find({
        $text: { $search: query },
      })
        .skip((page - 1) * size) // Skip documents for previous pages
        .limit(size); // Limit the result to the specified page size
  
      // Count total documents matching the query
      const totalBlogs = await Blog.countDocuments({
        $text: { $search: query },
      });
      const totalPages = Math.ceil(totalBlogs / size);
  
      res.status(200).json({
        success: true,
        blogs,
        currentPage: page,
        totalPages,
        totalBlogs,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: `Error searching blogs: ${error.message}`,
      });
    }
  };
  

// export const editBlog = async (req, res) => {
//   const { id } = req.params;

//   const { title, content, tags } = req.body;
//   const imageUrl = req.file ? req.file.path : null;

//   let tags_array = [];
//   if (typeof tags === "string") {
//     tags_array = tags.split(",").map((tag) => tag.trim()) || [];
//     console.log(tags_array, tags_array.length);
//   } else if (Array.isArray(tags)) {
//     tags_array = tags;
//   }

//   req.body.tags = tags_array;

//   try {
//     // Validate the update input

//     blogUpdateSchema.parse(req.body);

//     // Find the blog by ID
//     const blog = await Blog.findById(id);
//     if (!blog) {
//       return res
//         .status(404)
//         .json({ success: false, message: `Blog with id ${id} not found` });
//     }

//     // Update fields if they are provided
//     console.log(title, content, imageUrl, tags);
//     blog.title = title || blog.title;
//     blog.content = content || blog.content;
//     blog.imageUrl = imageUrl || blog.imageUrl;
//     blog.tags = tags_array || blog.tags;

//     // Save the updated blog
//     const updatedBlog = await blog.save();

//     res.status(200).json({ success: true, blog: updatedBlog });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: `Blog with id ${id} not found` });
    }

    res
      .status(200)
      .json({
        success: true,
        message: `Blog with id ${id} deleted successfully`,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: `Error deleting blog: ${error.message}`,
      });
  }
};
