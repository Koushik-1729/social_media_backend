import User from '../models/user.mjs';
import path from 'path';
import fs from 'fs';
export const addUserSubmission = async (req, res) => {
  try {
    const { name, socialMediaHandle } = req.body;
    if (!name || !socialMediaHandle) {
      return res.status(400).json({ message: 'Name and social media handle are required' });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }
    const images = req.files.map((file) => `/uploads/${file.filename}`);
    const newUser = new User({ name, socialMediaHandle, images });

    await newUser.save();
    res.status(200).json({ message: 'User submission successful', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting user data' });
  }
};

// Get all user submissions
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching user data' });
  }
};
