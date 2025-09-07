import User from "../models/user.model.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ admin: false }).select("-password");
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

export const addStudent = async (req, res) => {
  try {
    const { email, name, password, course } = req.body;

    if (!email || !name || !password || !course) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const bcrypt = await import("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const student = await User.create({
      email,
      name,
      password: hashedPassword,
      admin: false,
      course,
    });

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error creating student" });
  }
};

export const editStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, course } = req.body;

    const student = await User.findOneAndUpdate(
      { _id: id, admin: false },
      { name, email, course },
      { new: true }
    ).select("-password");

    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error updating student" });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await User.findOneAndDelete({ _id: id, admin: false });
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student" });
  }
};
