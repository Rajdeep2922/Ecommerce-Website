const express = require("express");
const products = require("../data/products");

const router = express.Router();

// GET /products - Returns all products
router.get("/", (req, res) => {
    res.json({
        success: true,
        count: products.length,
        data: products
    });
});

// GET /products/:id - Returns a single product by ID
router.get("/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find((p) => p.id === productId);

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
});

module.exports = router;
