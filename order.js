const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            name: String,
            price: Number,
            quantity: Number
        }
    ],

    totalAmount: Number,

    status: {
        type: String,
        default: "Pending"
    }
},
{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);