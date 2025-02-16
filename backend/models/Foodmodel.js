const mongoose = require('mongoose');

const posSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true,
   
  },
  
});

const FoodItem = mongoose.model('FoodItem', posSchema);

module.exports = FoodItem;