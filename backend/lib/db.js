import mongoose from "mongoose";

const URI = process.env.MONGODB_URI

export const connectDb = async ()=>{
    try {
        const conn = await mongoose.connect(URI)

        console.log(`Connected to : ${conn.connection.host}`)
        
    } catch (error) {
        console.log(`Failed to connect mongodb: `,error)
        
    }
}