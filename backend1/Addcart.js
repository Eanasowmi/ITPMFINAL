const express = require("express");
const CartItem = require("../models/addtocart");
const Material = require("../models/materialModel"); // Ensure the correct path
const router = express.Router();

// Add item to cart
router.post("/cart", async (req, res) => {
  try {
    const {
      userId,
      color,
      colorPrice,
      imageDataURL,
      imagePrice,
      materialName,
      materialPrice,
      selectedApparel,
      text = "",
      textPrice,
      totalPrice,
      quantity = 0,
    } = req.body;

    // Validate required fields
    if (!userId ||!materialName || !imageDataURL || !color || !materialPrice || !colorPrice || !imagePrice || !textPrice || !selectedApparel || !totalPrice) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create new cart item
    const newCartItem = new CartItem({
      userId, 
      imageDataURL,
      color,
      materialName,
      materialPrice,
      colorPrice,
      imagePrice,
      textPrice,
      text,
      selectedApparel,
      totalPrice,
      quantity,
    });

    await newCartItem.save();
    res.status(201).json(newCartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update item quantity
router.put("/cart/:id/quantity", async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    const cartItem = await CartItem.findById(id);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    const material = await Material.findOne({ name: cartItem.materialName });
    if (!material) {
      return res.status(404).json({ error: "Material not found" });
    }

    const quantityDifference = cartItem.quantity - quantity;

    if (material.quantity + quantityDifference < 0) {
      return res.status(400).json({ error: "Not enough material available" });
    }

    material.quantity += quantityDifference;
    await material.save();

    const updatedItem = await CartItem.findByIdAndUpdate(
      id,
      { quantity },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all items in the cart
router.get("/cart", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove item from cart
router.delete("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Checkout (Dummy endpoint for processing payment)
router.post("/cart/checkout", async (req, res) => {
  try {
    const { cartItems, total } = req.body; // Expecting cart items and total in the request body

    // Here, you'd integrate with a payment gateway
    // For now, we'll just return the received data as a success message
    res.status(200).json({ message: "Payment processed successfully!", cartItems, total });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
