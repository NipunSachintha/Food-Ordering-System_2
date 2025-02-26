const express = require("express");
const router = express.Router();
const FoodItem = require('../models/Foodmodel');
const User = require('../models/UserModel');
const Order = require('../models/orderModel');
const authMiddleware = require('../middleware/authMiddleware');


//admin routes for users
router.get("/getUsers",authMiddleware(['admin']), async (req, res) => {
    const Ausers = await User.find({}).select('username role _id'); // Select only username, role, and _id
    const users = Ausers.filter((user) => user.role !== "admin");
  res.json(users);
});

router.delete('/deleteUser/:id',authMiddleware(['admin']), async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.json({ message: err });
  }
})



//admin routes for food items

router.get("/getFoodItems",authMiddleware(['admin']), async (req, res) => {
  try {
    const foodItems = await FoodItem.find({});
    res.json(foodItems);
} catch (err) {
    res.json({ message: err });
}
});

router.post("/updateFoodItem",authMiddleware(['admin']), async (req, res) => {
  const { _id, name, price, category } = req.body;
  try {
    const foodItem = await FoodItem.findById(_id);
    foodItem.name = name;
    foodItem.price = price;
    foodItem.category = category;
    await foodItem.save();
    res.json({ message: "Item updated successfully" });
    
  } catch (err) {
    res.json({ message: err });
  }
}
);

router.delete('/deleteFoodItem/:id',authMiddleware(['admin']), async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await FoodItem.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/addFoodItem",authMiddleware(['admin']), async (req, res) => {
  const { name, price, category } = req.body;
  const foodItem = new FoodItem({
    name,
    price,
    category
  });

  try {
    const savedFoodItem = await foodItem.save();
    res.json(savedFoodItem);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/updateUsers", authMiddleware(['admin']), async (req, res) => {
  const { _id, username, role } = req.body;
  
  try {
    const userItem = await User.findById(_id);
    
    if (!userItem) {
      return res.status(404).json({ message: "User not found" });
    }
    
    userItem.username = username;
    userItem.role = role;
    
    await userItem.save();
    
    res.json({ message: "User details updated successfully" });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/orderDetails',authMiddleware(['admin']) ,async (req, res) => {
  try {
    const orders = await Order.find(
      {isComplete:true},
      { time: 1, total: 1, "items.name": 1, "items.quantity": 1 , "items.price": 1}
    );
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
