const express = require("express");
const router = express.Router();
const FoodItem = require('../models/Foodmodel');
const User = require('../models/UserModel');




router.get("/getUsers", async (req, res) => {
    const Ausers = await User.find({}).select('username role _id'); // Select only username, role, and _id
    const users = Ausers.filter((user) => user.role !== "admin");
  res.json(users);
});

router.get("/getFoodItems", async (req, res) => {
  try {
    const foodItems = await FoodItem.find({});
    res.json(foodItems);
} catch (err) {
    res.json({ message: err });
}
});

router.post("/updateFoodItem", async (req, res) => {
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

router.delete('/deleteFoodItem/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    await FoodItem.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/addFoodItem", async (req, res) => {
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

module.exports = router;
