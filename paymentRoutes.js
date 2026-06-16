const express = require("express");
const router = express.Router();

const Razorpay = require("razorpay");
const crypto = require("crypto");

const Order = require("../models/Order");

// ===============================
// RAZORPAY INSTANCE
// ===============================
const razorpay = new Razorpay({
    key_id: "YOUR_KEY_ID",
    key_secret: "YOUR_KEY_SECRET"
});

// ===============================
// CREATE ORDER
// ===============================
router.post("/create-order", async (req, res) => {
    try {

        const options = {
            amount: req.body.amount * 100, // convert to paise
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ===============================
// VERIFY PAYMENT + SAVE ORDER
// ===============================
router.post("/verify-payment", async (req, res) => {
    try {

        const {
            userId,
            items,
            totalAmount,
            paymentId
        } = req.body;

        // Save order in DB
        const newOrder = new Order({
            userId,
            items,
            totalAmount,
            paymentId,
            status: "Paid"
        });

        await newOrder.save();

        res.json({
            message: "Payment Verified & Order Saved"
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;