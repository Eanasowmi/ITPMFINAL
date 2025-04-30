const Order = require('../models/Order');
const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');

exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({
      ...order.toObject(),
      orderNumber: order.formatOrderNumber(),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    const formattedOrders = orders.map(order => ({
      ...order.toObject(),
      orderNumber: order.formatOrderNumber(),
    }));
    res.status(200).json(formattedOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({
      ...order.toObject(),
      orderNumber: order.formatOrderNumber(),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
    try {
      const { id } = req.params;
      const { state } = req.body; 
  
      const validStates = ['processing', 'accepted', 'conduct', 'finalizing', 'process', 'finished', 'shipped', 'delivered', 'rejected'];
      if (!validStates.includes(state)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
  
      const order = await Order.findByIdAndUpdate(id, { state: state }, { new: true, runValidators: true });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      const user = await User.findById(order.userId); 
  
      if (user) {
        let subject, text;
  
        switch (state) {
          case 'accepted':
            subject = `Order Accepted: ${order.formatOrderNumber()}`;
            text = `Your order ${order.formatOrderNumber()} has been accepted.`;
            break;
          case 'finished':
            subject = `Order Finished: ${order.formatOrderNumber()}`;
            text = `Your order ${order.formatOrderNumber()} is finished.`;
            break;
          case 'delivered':
            subject = `Order Delivered: ${order.formatOrderNumber()}`;
            text = `Your order ${order.formatOrderNumber()} has been delivered.`;
            break;
          case 'rejected':
            subject = `Order Rejected: ${order.formatOrderNumber()}`;
            text = `Your order ${order.formatOrderNumber()} has been rejected.`;
            break;
          default:
            break;
        }
  
        if (subject && text) {
          await sendEmail(user.email, subject, text);
        }
      }
  
      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
          return res.status(400).json({ message: 'Order ID is required' });
        }
    
        const result = await Order.findByIdAndDelete(orderId);
        if (!result) {
          return res.status(404).json({ message: 'Order not found' });
        }
    
        res.status(200).json({ message: 'Order deleted successfully' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }

    
  };

