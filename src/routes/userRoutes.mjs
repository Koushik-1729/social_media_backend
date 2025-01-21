import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { addUserSubmission, getUsers } from '../controller/userController.mjs';

const router = express.Router();

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(path.resolve(), 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath); // Create the uploads folder if it doesn't exist
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post('/submit', upload.array('images', 10), addUserSubmission);
router.get('/users', getUsers);

export default router;
