import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';
import homeroute from './routes/home.js';
import uploadroute from './routes/upload.js';
import downloadroute from './routes/download.js';

dotenv.config();

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  
app.use(express.json());
app.use("/",homeroute);
app.use("/",uploadroute);
app.use("/",downloadroute);
app.use((req, res) => {
    res.status(404).send('Page not found');
});


const client = new MongoClient(process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(4000, ()=> {
            console.log('listening on port',4000);
        });
    })
    .catch((error) => {
        console.log(error);
    });

client.close();

export default app;
