import mongoose from "mongoose";

const MONGO_URI="mongodb://localhost:27017/notes"
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}