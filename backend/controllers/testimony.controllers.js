import { Testimony } from "../models/Testimony.js";
import { z } from "zod";

// Zod validation schema
const testimonySchema = z.object({
    name: z.string().min(5).max(100),
    content: z.string().min(10),
    imageUrl: z.string().optional(),
});

const testimonyUpdateSchema = z.object({
    name: z.string().min(5).max(100).optional(),
    content: z.string().min(10).optional(),
    imageUrl: z.string().optional(),
});


export const createTestimony = async (req, res) => {
    const { name, content } = req.body;

    const imageUrl = req.file ? req.file.path : null;

    try {
        testimonySchema.parse(req.body); // Validate the request body
        const testimony = new Testimony({
            name,
            content,
            imageUrl,
        });

        await testimony.save();
        res.status(201).json({ success: true, testimony });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, msg: error.message });
    }
}

export const getAllTestimonies = async (req, res) => {
    try {
        const testimonies = await Testimony.find();
        res.status(200).json({ success: true, testimonies });
    } catch (error) {
        res.status(500).json({ message: `Error fetching testimonies: ${error.message}` });
    }
}

export const getTestimonyById = async (req, res) => {
    const { id } = req.params;
    try {
        const testimony = await Testimony.findById(id);
        if (!testimony) return res.status(404).json({ message: `Testimony with id ${id} not found` });
        res.status(200).json({ success: true, testimony });
    } catch (error) {
        res.status(500).json({ message: `Error fetching testimony: ${error.message}` });
    }
}

export const editTestimony = async (req, res) => {
    const { id } = req.params;
    const { name, content } = req.body;
    
    // If a new image is uploaded, use its path, otherwise, keep the old image URL
    const imageUrl = req.file ? req.file.path : undefined; 
  
    try {
      // Validate the request body (optional fields allowed)
      testimonyUpdateSchema.parse(req.body);
      
      const updateData = {
        ...(name && { name }),
        ...(content && { content }),
        ...(imageUrl && { imageUrl }), // Only include if a new image was uploaded
      };
  
      const testimony = await Testimony.findByIdAndUpdate(id, updateData, { new: true });
  
      if (!testimony) return res.status(404).json({ message: `Testimony with id ${id} not found` });
      res.status(200).json({ success: true, testimony });
    } catch (error) {
        console.error(error);
      res.status(500).json({ message: `Error updating testimony: ${error.message}` });
    }
  };
  

export const deleteTestimony = async (req, res) => {
    const { id } = req.params;
    try {
        const testimony = await Testimony.findByIdAndDelete(id);
        if (!testimony) return res.status(404).json({ message: `Testimony with id ${id} not found` });
        res.status(200).json({ success: true, message: "Testimony deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: `Error deleting testimony: ${error.message}` });
    }
}
