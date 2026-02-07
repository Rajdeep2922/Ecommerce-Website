// Validation middleware for cart operations
const validateCartRequest = (req, res, next) => {
    const { productId, quantity } = req.body;

    // Check if productId exists
    if (productId === undefined || productId === null) {
        return res.status(400).json({
            success: false,
            error: "productId is required"
        });
    }

    // Check if productId is a number
    if (typeof productId !== "number" || !Number.isInteger(productId)) {
        return res.status(400).json({
            success: false,
            error: "productId must be an integer"
        });
    }

    // Check if quantity exists
    if (quantity === undefined || quantity === null) {
        return res.status(400).json({
            success: false,
            error: "quantity is required"
        });
    }

    // Check if quantity is a positive integer
    if (typeof quantity !== "number" || !Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
            success: false,
            error: "quantity must be a positive integer"
        });
    }

    next();
};

module.exports = { validateCartRequest };
