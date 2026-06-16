const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

// ✅ FIXED IMPORT (NO middleware folder)
const verifyToken = require("../authMiddleware");

// ===============================
// GET ALL ORDERS (ADMIN VIEW)
// ===============================
router.get("/all-orders", verifyToken, async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ===============================
// UPDATE ORDER STATUS
// ===============================
router.put("/update-status/:id", verifyToken, async (req, res) => {
    try {
        const { status } = req.body;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json(updatedOrder);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;