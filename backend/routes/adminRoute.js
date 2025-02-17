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

module.exports = router;
