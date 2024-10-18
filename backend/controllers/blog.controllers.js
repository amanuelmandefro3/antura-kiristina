import { Blog } from "../models/Blog.js";
import { z } from "zod";    

// Zod validation schema
const blogSchema = z.object({
    title: z.string().min(5).max(100),
    content: z.string().min(10),
    imageUrl: z.string().optional(),
    tags: z.array(z.string()).optional(), 
});

const blogUpdateSchema = z.object({
    title: z.string().min(5).max(100).optional(),
    content: z.string().min(10).optional(),
    imageUrl: z.string().optional(),
    tags: z.array(z.string()).optional(),  
});



export const createBlog = async (req, res) => {
    const { title, content, tags } = req.body;
    console.log(tags)
    let tags_array = [];
    if (typeof(tags) === 'string') {
        tags_array = tags.split(',').map(tag => tag.trim())|| [];
        console.log(tags_array, tags_array.length);

    } else if(Array.isArray(tags)) {
        tags_array = tags;
    }

    
    req.body.tags = tags_array;

    const imageUrl = req.file ? req.file.path : null;
    console.log(tags);

    try {
        blogSchema.parse(req.body); // Validate the request body
        const blog = new Blog({
            title,
            content,
            imageUrl,
            tags: tags_array || [], 
        });


        await blog.save();
        res.status(201).json({ success: true, blog });
    } catch (error) {
        console.log('I was here!');
        console.error(error);
        res.status(400).json({ success: false, msg: error.message });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ message: `Error fetching blogs: ${error.message}` });
    }
};

export const getBlogById = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await Blog.findById(id);
        if (!blog) return res.status(404).json({ message: `Blog with id ${id} not found` });
        
        return res.status(200).json({ success: true, blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error fetching blog: ${error.message}` });
    }
};


export const searchBlogs = async (req, res) => {
    const { query } = req.query;  // Extract search query from query parameters

    if (!query) {
        return res.status(400).json({ success: false, message: "No search query provided" });
    }

    try {
        // Perform full-text search using MongoDB's $text operator
        const blogs = await Blog.find({
            $text: { $search: query }
        });

        res.status(200).json({ success: true, blogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Error searching blogs: ${error.message}` });
    }
};



export const editBlog = async (req, res) => {
    const { id } = req.params;

    const { title, content, tags } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    let tags_array = [];
    if (typeof(tags) === 'string') {
        tags_array = tags.split(',').map(tag => tag.trim())|| [];
        console.log(tags_array, tags_array.length);

    } else if(Array.isArray(tags)) {
        tags_array = tags;
    }

    
    req.body.tags = tags_array;




    try {
        // Validate the update input

        blogUpdateSchema.parse(req.body);

        // Find the blog by ID
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: `Blog with id ${id} not found` });
        }

        // Update fields if they are provided
        console.log(title, content, imageUrl, tags);
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.imageUrl = imageUrl || blog.imageUrl;
        blog.tags = tags_array || blog.tags;

        // Save the updated blog
        const updatedBlog = await blog.save();

        res.status(200).json({ success: true, blog: updatedBlog });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const deleteBlog = async (req, res) => {
    const {id} = req.params;
    try {
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: `Blog with id ${id} not found` });
        }

        res.status(200).json({ success: true, message: `Blog with id ${id} deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: `Error deleting blog: ${error.message}` });
    }
}
