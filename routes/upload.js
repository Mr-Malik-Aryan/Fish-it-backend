import multer from 'multer';
import bcrypt from 'bcryptjs';
import express from 'express';
import { Router } from 'express';
import data from '../models/data.js';
import { type } from 'os';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash((req.body.password+req.body.name),process.env.SALT);

    const newFile = new data({
      name: req.body.name,
      fileName:req.file.originalname,
      text: req.body.text,
      password: hashedPassword,
      file: req.file.buffer,
      type:req.file.mimetype
    });
    console.log(newFile)

    const savedFile = await newFile.save();
    console.log('File saved successfully:');
    res.status(200).send('File uploaded successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Internal server error.');
  }
});

export default router;
