import { connectDB } from "@/helper/db";
import mongoose, { Schema, model } from "mongoose";
// import connectDB from "../lib/db";  // Your connection utility

type UserType = {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
};

const UserSchema = new Schema<UserType>({
    username: { type: String, required: true },
    email: { 
        type: String, 
        required: [true, "Email Required!!"], 
        unique: true 
    },
    password: { 
        type: String, 
        required: [true, "Password Required!!"] 
    },
    role: { 
        type: String, 
        enum: ["admin", "user"], 
        default: "user" 
    },
});

// Safe model retrieval with connection check
export const getUserModel = async () => {
    await connectDB();
    return mongoose.models.User || model<UserType>("User", UserSchema);
};
