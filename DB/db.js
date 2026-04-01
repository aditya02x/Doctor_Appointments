import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()


export const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to the database");
        
    } catch (error) {
        console.log(error);
        console.log("Error connecting to the database");
        process.exit(1);
        
    }
}