import { Schema, model, models } from "mongoose";

type UserType = {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
};

const UserSchema = new Schema<UserType>({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "Email Required!!"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password Required!!"],
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});

export const User = models.User || model<UserType>("User", UserSchema);