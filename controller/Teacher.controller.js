const Teacher = require("../models/Teacher"); // Mongoose model
const { uploadOncloudinary } = require("../utils/cloudinary");
// GET: Fetch all teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers" });
  }
};

const fs = require("fs");
// const cloudinary = require("../config/cloudinaryConfig");
// POST: Add new teacher
exports.addTeacher = async (req, res) => {
  try {
    const { name, qualification, contact,post } = req.body;
    console.log(req.body);
    if (!req.file || !req.file.path) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const result = await uploadOncloudinary(req.file.path, "image");

    if (!result || !result.secure_url) {
      console.log(imagePath);
      return res.status(500).json({ error: "Error uploading image" });
    }
    const teacher = new Teacher({
      name,
      qualification,
      contact,
      image: result.secure_url,
      post
    });

    await teacher.save();
    res.status(201).json({ message: "Teacher added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (req.file && req.file.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
  }
};

// PUT: Update teacher details
exports.updateTeacher = async (req, res) => {
  const { id } = req.params;
  const { name, qualification, image, contact, subject } = req.body;

  try {
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { name, qualification, image, contact, subject },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Teacher updated successfully", updatedTeacher });
  } catch (error) {
    res.status(500).json({ message: "Error updating teacher" });
  }
};

// DELETE: Remove teacher
exports.removeTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Teacher removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing teacher" });
  }
};
