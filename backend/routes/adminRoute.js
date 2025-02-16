const express = require("express");
const router = express.Router();
const FoodItem = require('../models/Foodmodel');

const Ausers = [
  { name: "John Doe", email: "john@example.com", role: "admin" },
  { name: "Jane Smith", email: "jane@example.com", role: "chef" },
  { name: "Bob Johnson", email: "bob@example.com", role: "cashier" },
];

const foodItems = [
  { id:1,name: "Original Recipe Chicken",category:'category1', price: 10 },
  { id:2,name: "Zinger Burger",category:'category3', price: 5 },
  {id:3, name: "Fries",category:'category1', price: 2 },
];


router.get("/getUsers", async (req, res) => {
  //console.log('ok')
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
