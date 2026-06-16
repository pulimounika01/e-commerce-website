const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

// Add item to cart
router.post("/", async (req, res) => {
    try {
        const cartItem = await Cart.create(req.body);
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Get all cart items
router.get("/", async (req, res) => {
    try {
        const cartItems = await Cart.find().populate("productId");
        res.json(cartItems);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// Remove item from cart
router.delete("/:id", async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);

        res.json({
            message: "Item removed from cart"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;