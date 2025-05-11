// models/adminRole.ts (model setup)
import { connectDB } from "@/helper/db";
import mongoose, { Schema, model } from "mongoose";
// import connectDB from "../lib/db";

type AdminRoleType = {
    email: string;
    currentRole: "admin" | "user";
};

const AdminRoleSchema = new Schema<AdminRoleType>({
    email: {
        type: String,
        required: [true, "Email Required!!"],
        unique: true,
    },
    currentRole: {
        type: String,
        enum: ["admin", "user"],
        default: "admin",
    },
});

// Get connected model
const getAdminRoleModel = async () => {
    await connectDB();
    return (
        mongoose.models.AdminRole || model<AdminRoleType>("AdminRole", AdminRoleSchema)
    );
};

export default getAdminRoleModel;