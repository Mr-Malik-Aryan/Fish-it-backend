import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import homeroute from './routes/home.js';
import uploadroute from './routes/upload.js';
import downloadroute from './routes/download.js';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
  
app.use(express.json());
app.use("/", homeroute);
app.use("/", uploadroute);
app.use("/", downloadroute);
app.use((req, res) => {
    res.status(404).send('Page not found');
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing MongoDB connection');
    mongoose.connection.close();
});

export default app;
