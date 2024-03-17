// Importing express module 
import express from 'express';

const router = express.Router();

// Handling request using router 
router.get("/",(req,res,next)=>{ 
    res.send("This is a home page")
}) 

// Exporting the router 
export default router;
