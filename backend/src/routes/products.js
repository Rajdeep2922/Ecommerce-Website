const express = require("express");
const Product = require("../models/Product");
const productsData = require("../data/products");

const router = express.Router();

// GET /products - Returns all products with optional search and category filter
router.get("/", async (req, res) => {
    try {
        const { search, category } = req.query;

        // Try MongoDB first
        if (req.dbConnected) {
            let query = {};

            if (search) {
                query.name = { $regex: search, $options: "i" };
            }

            if (category && category !== "all") {
                query.category = category;
            }

            const products = await Product.find(query);
            return res.json({
                success: true,
                count: products.length,
                data: products
            });
        }

        // Fallback to in-memory data
        let products = [...productsData];

        if (search) {
            products = products.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (category && category !== "all") {
            products = products.filter((p) => p.category === category);
        }

        res.json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /products/categories - Get all unique categories
router.get("/categories", async (req, res) => {
    try {
        const categories = ["electronics", "clothing", "accessories", "home", "sports"];
        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /products/:id - Returns a single product by ID
router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id, 10);

        // Try MongoDB first
        if (req.dbConnected) {
            const product = await Product.findOne({ id: productId });
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: "Product not found"
                });
            }
            return res.json({
                success: true,
                data: product
            });
        }

        // Fallback to in-memory
        const product = productsData.find((p) => p.id === productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        res.json({
            success: true,
            data: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;
