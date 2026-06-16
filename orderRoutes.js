const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

// 🔐 Middleware: Verify Token
function verifyToken(req, res, next) {

    const authHeader = req.header("Authorization");

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Access Denied. No token provided."
        });
    }

    try {

        const verified = jwt.verify(token, "secretkey");

        req.user = verified;

        next();

    } catch (err) {

        return res.status(400).json({
            message: "Invalid Token"
        });
    }
}


router.post("/", verifyToken, async (req, res) => {

    try {

        const newOrder = new Order({
            userId: req.user.id,
            items: req.body.items,
            totalAmount: req.body.totalAmount
        });

        await newOrder.save();

        res.json({
            message: "Order placed successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});

router.get("/my-orders", verifyToken, async (req, res) => {

    try {

        const orders = await Order.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.json(orders);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;