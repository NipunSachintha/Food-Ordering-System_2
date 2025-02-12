const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');


// Define your routes here
router.get('/getInCompleteOrders', async (req, res) => {
  //console.log('ok')
  try{
    const orders = await Order.find({isComplete:false}).sort({ time: -1 });

    //console.log(orders[0].items);
    res.json(orders);
  }
  catch(err){
    res.json({message: err});
  }
  //res.json(order);
}
);


router.post('/placeOrder', async (req, res) => {
  
  try{
    const order = new Order(req.body);
    await order.save();
    

  }
  catch(err){
    res.json({message: err});
  }
  //console.log('Order placed successfully');
  res.json({message: 'Order placed successfully'});
})


module.exports = router;