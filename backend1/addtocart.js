const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageDataURL: { type: String, required: true },
  color: { type: String, required: true },
  materialName: { type: String, required: true },
  materialPrice: { type: Number, required: true },
  colorPrice: { type: Number, required: true },
  imagePrice: { type: Number, required: true },
  textPrice: { type: Number, required: true },
  text: { type: String, default: "" }, // Default to empty string
  selectedApparel: {
    type: new mongoose.Schema({
      type: { type: String, required: true },
      price: { type: Number, required: true },
    }),
    required: true,
  },
  totalPrice: { type: Number, required: true },
  quantity: { type: Number, default: 1 }, // Default to 1
});

const CartItem = mongoose.model("CartItem", CartItemSchema);

module.exports = CartItem;
