import mongoose from "mongoose";

export async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;

    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in environment variables");
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB_NAME || "diningManagement",
            retryWrites: true,
            w: "majority",
        });
        console.log("Connected to Database.");
    } catch (err) {
        console.log("Database connection error:", err);
        throw err;
    }
}
