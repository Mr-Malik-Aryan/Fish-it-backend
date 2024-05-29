import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { promises as fs } from 'fs'; // Import fs.promises for async file read
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve( './.env') });


const router = express.Router();
import data from '../models/data.js';
import { type } from 'os';

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.get('/download/:fileName/:password', async (req, res) => {
  const fileName = req.params.fileName;
  const password = req.params.password;
    const hashedPassword = await bcrypt.hash((password+fileName),process.env.SALT);

  try {
    const file = await data.findOne({ "password": hashedPassword });

    if (!file) {
      return res.status(404).send('File not found');
    }

    bcrypt.compare(password+fileName,file.password).then(function(result) {
      // result == true
      if(result===true)
      {
        const jsonResponse = {
          message: 'success',
          text: file.text,
          fileName: file.fileName,
     
        }
      
    
        res.json(jsonResponse);

      }
      else
      res.send("Wrong Password")

  });

  } catch (error) {
    console.error('Error retrieving file details from the database:', error);
    res.status(500).send('Internal server error');
  }
});

router.get('/downloadfile/:fileName/:password', async (req, res) => {
  const fileName = req.params.fileName;
  const password = req.params.password;
  const hashedPassword = await bcrypt.hash((password+fileName),process.env.SALT);
  
  try {
    const file = await data.findOne({ "password": hashedPassword});

    if (!file) {
      return res.status(404).send('File not found');
    }

    bcrypt.compare(password+fileName,file.password).then(function(result) {
      // result == true
      console.log(file.type)
      if(result===true)
      {
        const response ={
          message:'success',
          text: file.text,
          fileName: file.fileName,
          file:file.file,
          type:file.type
         }
        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
      
         console.log(response)
        res.send(response.file);

      }
      else
      
      {
        const response ={
          message: 'Wrong Password ',
          text: file.text,
          fileName: file.fileName,
          file:'null',
          type:file.type
         }
        res.send(response)
      }
     

  });

   

   

  } catch (error) {
    console.error('Error retrieving file from the database:', error);
    res.status(500).send('Internal server error');
  }
});

export default router;
