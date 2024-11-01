import { Student } from "../models/Student.js";
import { z } from "zod";

// Define the Zod schema with updated fields
const studentZodSchema = z.object({
  fullName: z.string().min(3).max(50),
  age: z.number().int().min(12).max(18),
  phoneNumber: z.string().min(10).max(15).optional(),
  email: z.string().email().min(5).max(100),
  churchName: z.string().min(3).max(100),
  address: z.string().min(5).max(200),
  familyMemberName: z.string().min(3).max(50),
  familyPhoneNumber: z.string().min(10).max(15),
  q1: z.string().min(1).max(1000),
  q2: z.string().min(1).max(1000),
  q3: z.string().min(1).max(1000),
  q4: z.string().min(1).max(1000),
  q5: z.string().min(1).max(1000),
  q6: z.string().min(1).max(1000),
  q7: z.string().min(1).max(1000),
  q8: z.string().min(1).max(1000),
  q9: z.string().min(1).max(1000),
  registeredAt: z.date().default(() => new Date()),
});

export const registerStudent = async (req, res) => {
  try {
    // Validate the request body using Zod
    const validatedData = studentZodSchema.parse(req.body);

    // Check if a student with the same email or phone number already exists
    let student = await Student.findOne({ email: validatedData.email });
    if (student) {
      return res.status(400).json({
        msg: "Student already exists with this email or phone number",
      });
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
    res.status(500).json({ msg: "Server Error" });
  }
};

export const getStudents = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const size = parseInt(req.query.size) || 10; // Default to 10 items per page if not provided
  try {
    const totalStudents = await Student.countDocuments();
    const totalPages = Math.ceil(totalStudents / size);
    const students = await Student.find()
      .limit(size)
      .skip(size * (page - 1));
    res
      .status(200)
      .json({
        success: true,
        data: students,
        totalPages,
        currentPage: page,
        totalStudents,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server Error" });
  }
};
