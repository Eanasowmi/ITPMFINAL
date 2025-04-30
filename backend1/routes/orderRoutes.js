const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);
router.get('/orders/:id', orderController.getOrderById);
router.patch('/orders/:id', orderController.updateOrder);
router.delete('/orders/:id', orderController.deleteOrder);
// // routes/orderRoutes.js
// router.post('/orders/delete', orderController.bulkDeleteOrders);
// router.put('/:id/update', orderController.updateOrderStatus);
module.exports = router;
