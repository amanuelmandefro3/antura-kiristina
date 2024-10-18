import {Student} from '../models/Student.js';
import { z } from 'zod';


// Define the Zod schema
const studentZodSchema = z.object({
    name: z.string().min(2).max(50),
    age: z.number().int().min(1).max(120),
    phoneNum: z.string().min(10).max(15).optional(),
    email: z.string().email().min(5).max(100),
    churchName: z.string().min(2).max(100),
    address: z.string().min(5).max(200),
    familyMembersName: z.string().min(2).max(50),
    familyMembersPhoneNum: z.string().min(10).max(15),
    registeredAt: z.date().default(() => new Date())
});

export const registerStudent = async (req, res) => {
    try {
        // Validate the request body using Zod
        const validatedData = studentZodSchema.parse(req.body);

        // Check if a student with the same email or phone number already exists
        let student = await Student.findOne({ email: validatedData.email });
        console.log(student);
        if (student) {
            return res.status(400).json({ msg: 'Student already exists with this email or phone number' });
        }

        // Create a new student
        student = new Student(validatedData);

        await student.save();
        res.status(200).json({ success: true, data: student });

    } catch (err) {
        if (err instanceof z.ZodError) {
            // Handle Zod validation errors
            return res.status(400).json({ success: false, errors: err.errors });
        }
        console.log(err);
        res.status(500).json({ msg: 'Server Error' });
    }
}

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ success: true, data: students });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server Error' });
    }
}