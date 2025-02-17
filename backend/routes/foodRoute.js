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

router.post('/addFoodItem', async (req, res) => {
    const foodItem = new FoodItem({
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    });

    try {
        const savedFoodItem = await foodItem.save();
        res.json(savedFoodItem);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;