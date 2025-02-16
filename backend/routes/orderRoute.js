const express = require('express');
const Order = require('../models/orderModel');
const router = require('./foodRoute');

module.exports = (io) => {
  const router = express.Router();

  // Define your routes here
  router.get('/getInCompleteOrders', async (req, res) => {
    try {
      const orders = await Order.find({isComplete:false}).sort({ time: -1 });
      res.json(orders);
    } catch (err) {
      res.json({ message: err });
    }
  });

  router.post('/placeOrder', async (req, res) => {
    try {
      const order = new Order(req.body);
      await order.save();
      io.emit('newOrder', order); // Emit the new order event
      res.json({ message: 'Order placed successfully' });
    } catch (err) {
      res.json({ message: err });
    }
  });
  router.post('/completeOrderByGivenId', async (req, res) => {
    
    try {
      const order = await Order.findById(req.body._id);
      
      order.isComplete = true;
      await order.save();
      res.json({ message: 'Order completed successfully' });
    } catch (err) {
      res.json({ message: err });
    }
  
  }
  );


  return router;
};






