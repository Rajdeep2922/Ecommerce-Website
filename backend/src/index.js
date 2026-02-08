require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting - 500 requests per 15 minutes per IP
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500,
    message: {
        success: false,
        error: "Too many requests, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(limiter);

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Connect to MongoDB (with fallback to in-memory)
let dbConnected = false;
connectDB().then((conn) => {
    if (conn) {
        dbConnected = true;
        console.log("Using MongoDB for data storage");
    } else {
        console.log("Using in-memory data storage (MongoDB unavailable)");
    }
});

// Make dbConnected available to routes
app.use((req, res, next) => {
    req.dbConnected = dbConnected;
    next();
});

// Routes
app.use("/products", productsRouter);
app.use("/cart", cartRouter);

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        database: dbConnected ? "mongodb" : "in-memory",
        timestamp: new Date().toISOString()
    });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
