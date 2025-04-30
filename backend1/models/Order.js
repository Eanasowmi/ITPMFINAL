const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  orderDetails: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ['processing', 'accepted', 'conduct', 'finalizing', 'process', 'finished', 'shipped', 'delivered', 'rejected'],
    default: 'processing',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  selectedItemIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CartItem', // Assuming you have a CartItem model for cart items
  }],
}, { timestamps: true });

orderSchema.plugin(AutoIncrement, { inc_field: 'orderNumber', id: 'orderNumber_seq', start_seq: 1 });

orderSchema.methods.formatOrderNumber = function() {
  return `ORD${this.orderNumber.toString().padStart(3, '0')}`;
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
