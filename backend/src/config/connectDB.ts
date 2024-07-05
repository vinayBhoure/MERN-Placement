import mongoose from "mongoose";
import {config} from "dotenv";

config({
    path: '.env'
})

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://bhoure21:ecommerce@cluster0.jrczoxr.mongodb.net/")
        console.log(`MongoDB Connected: ${conn.connection.host}`)
        
    }catch(err){
        console.log(err)
        process.exit(1)
    }
}