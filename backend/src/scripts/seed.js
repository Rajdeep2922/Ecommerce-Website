require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const productsData = require("../data/products");

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");

        // Insert new products
        await Product.insertMany(productsData);
        console.log(`Seeded ${productsData.length} products`);

        mongoose.connection.close();
        console.log("Database connection closed");
    } catch (error) {
        console.error("Seeding error:", error.message);
        process.exit(1);
    }
};

seedDatabase();
