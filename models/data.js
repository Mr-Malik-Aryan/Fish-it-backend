
import mongoose from 'mongoose';

const dataSchema = mongoose.Schema(
    {
      
     
    name:{
        type:String,
        required: [true, "Please add a file name"],
        unique: true
    },
    fileName:{
        type:String,

    },
     text:{
        type:String
     },
     password:{
         type:String,
         required: [true, "Please add a password"],
     },
    file:{
        type:Buffer
    },
    
    type:{
        type:String
    }

   

 
}


);
dataSchema.index({ name: 1 }, { unique: true });


const data= mongoose.model("data",dataSchema);
export default data;
