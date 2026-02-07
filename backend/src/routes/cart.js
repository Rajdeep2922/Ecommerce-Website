const express = require("express");
const products = require("../data/products");
const { validateCartRequest } = require("../middleware/validation");

const router = express.Router();

// In-memory cart storage
let cart = [];

// POST /cart - Add item to cart
router.post("/", validateCartRequest, (req, res) => {
    const { productId, quantity } = req.body;

    // Find the product
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({
            success: false,
            error: "Product not found"
        });
    }

    // Check if product already exists in cart
    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            quantity,
            product
        });
    }

    res.status(201).json({
        success: true,
        message: "Item added to cart",
        data: {
            productId,
            quantity,
            product
        }
    });
});

// GET /cart - Get cart contents
router.get("/", (req, res) => {
    const total = cart.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    res.json({
        success: true,
        data: cart,
        total: parseFloat(total.toFixed(2))
    });
});

// DELETE /cart/:productId - Remove item from cart
router.delete("/:productId", (req, res) => {
    const productId = parseInt(req.params.productId, 10);
    const itemIndex = cart.findIndex((item) => item.productId === productId);

    if (itemIndex === -1) {
        return res.status(404).json({
            success: false,
            error: "Item not found in cart"
        });
    }

    cart.splice(itemIndex, 1);

    res.json({
        success: true,
        message: "Item removed from cart"
    });
});

module.exports = router;
