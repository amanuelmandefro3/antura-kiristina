import { Team } from "../models/Team.js";
import { z } from "zod";

// Validation schemas
const teamSchema = z.object({
    name: z.string().min(2).max(100),
    role: z.string().min(2).max(100),
});

const teamUpdateSchema = z.object({
    name: z.string().min(2).max(100).optional(),
    role: z.string().min(2).max(100).optional(),
});

// Create team member
export const createTeamMember = async (req, res) => {
    try {
        const { name, role } = req.body;
        
        // Validate request body
        teamSchema.parse(req.body);
        
        // Check if image was uploaded
        if (!req.file) {
            return res.status(400).json({
                success: false,
                msg: "Image is required"
            });
        }

        const imageUrl = req.file.path;

        const teamMember = new Team({
            name,
            role,
            imageUrl
        });

        await teamMember.save();

        res.status(201).json({
            success: true,
            msg: "Team member created successfully",
            teamMember
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.errors
            });
        }
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

// Get all team members
export const getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await Team.find() //.sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            teamMembers
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

// Get single team member
export const getTeamMember = async (req, res) => {
    try {
        const teamMember = await Team.findById(req.params.id);
        if (!teamMember) {
            return res.status(404).json({
                success: false,
                msg: "Team member not found"
            });
        }
        res.status(200).json({
            success: true,
            teamMember
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

// Update team member
export const updateTeamMember = async (req, res) => {
    try {
        const { name, role } = req.body;
        
        // Validate request body
        teamUpdateSchema.parse(req.body);

        let updateData = { name, role };

        // If new image is uploaded, update imageUrl
        if (req.file) {
            updateData.imageUrl = req.file.path;
        }

        const teamMember = await Team.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!teamMember) {
            return res.status(404).json({
                success: false,
                msg: "Team member not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Team member updated successfully",
            teamMember
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                success: false,
                errors: error.errors
            });
        }
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};

// Delete team member
export const deleteTeamMember = async (req, res) => {
    try {
        const teamMember = await Team.findByIdAndDelete(req.params.id);
        
        if (!teamMember) {
            return res.status(404).json({
                success: false,
                msg: "Team member not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Team member deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
}; 