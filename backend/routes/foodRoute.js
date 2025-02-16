const express = require("express");
const router = express.Router();
const FoodItem = require('../models/Foodmodel');



router.get('/getFoodItems', async (req, res) => {
    //console.log('ok')
    try {
        const foodItems = await FoodItem.find({});
        res.json(foodItems);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;