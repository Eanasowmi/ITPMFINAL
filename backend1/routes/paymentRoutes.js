
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/addtocart');

router.post('/webhook', async (req, res) => {
  const { order_id, status } = req.body;
console.log("call",order_id);
  try {
    const order = await Order.findById(order_id);
    if (!order) {
      return res.status(404).send('Order not found');
    }

    if (status === 'success') {
      // Remove items from cart
      await Cart.deleteMany({ userId: order.userId });

      // Update order status
      order.state = 'delivered';
      await order.save();
    }

    res.status(200).send('Webhook received successfully');
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
