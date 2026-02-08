const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        // Don't exit - allow fallback to in-memory data
        return null;
    }
};

module.exports = connectDB;
