import { connectDB } from "@/lib/db";
import mongoose, { Schema, model } from "mongoose";

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

export const getUserModel = async () => {
    await connectDB();
    return mongoose.models.User || model<UserType>("User", UserSchema);
};
