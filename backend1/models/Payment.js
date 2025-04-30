const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  merchant_id: { type: String, required: true },
  order_id: { type: String, required: true },
  payment_id: { type: String, required: true },
  payhere_amount: { type: Number, required: true },
  payhere_currency: { type: String, required: true },
  status_code: { type: Number, required: true },
  md5sig: { type: String, required: true },
  custom_1: { type: String },
  custom_2: { type: String },
  method: { type: String, required: true },
  status_message: { type: String, required: true },
  card_holder_name: { type: String },
  card_no: { type: String },
  card_expiry: { type: String },
  verified: { type: Boolean, default: false }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
