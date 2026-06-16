const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// Middleware
const verifyToken = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


// ===============================
// ➕ ADD PRODUCT (ADMIN ONLY)
// ===============================
router.post("/add-product", verifyToken, adminOnly, async (req, res) => {

    try {

        const product = new Product(req.body);

        await product.save();

        res.json({
            message: "Product added successfully",
            product
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


// ===============================
// 📦 GET ALL PRODUCTS (ADMIN ONLY)
// ===============================
router.get("/products", verifyToken, adminOnly, async (req, res) => {

    try {

        const products = await Product.find();

        res.json(products);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


// ===============================
// ❌ DELETE PRODUCT (ADMIN ONLY)
// ===============================
router.delete("/product/:id", verifyToken, adminOnly, async (req, res) => {

    try {

        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


module.exports = router;