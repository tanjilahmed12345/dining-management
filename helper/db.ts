import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(
            "mongodb+srv://ahmedtanjil:Tanjil1999%40@cluster0.ypxgkf9.mongodb.net/", // Base URI without the database name
            {
                dbName: "diningManagement", // Explicitly set the database name here
                retryWrites: true,
                w: "majority",
                appName: "Cluster0"
            }
        );
        console.log("Connected to Database.");
    } catch (err) {
        console.log("Database connection error:", err);
    }
}