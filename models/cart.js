const mongoose = require("mongoose");
const validator = require("validator");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      id: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: [true, "Please provide name of the product"],
      },
      desc: {
        type: String,
        required: [true, "Please provide desc of the product"],
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
