const express = require('express');
const router = express.Router();

const order = [
  {
    id: "2527858-c989-44e3-a397-4b3defcef377",
    items: [
      { item: "Original Recipe Chicken", quantity: 2 },
      { item: "Zinger Burger", quantity: 1 },
    ],
    status: "pending",
    time: "2025-02-12T11:36:48.000Z",
  },
  {
    id: "c4145130-282a-49c1-8954-b955b0e1ce4e",
    items: [{ item: "Fries", quantity: 5 }],
    status: "pending",
    time: "2025-02-12T11:36:48.000Z",
  },
  {
    id: "82315efb-3d64-476f-a624-53fabf057c32",
    items: [
      { item: "Original Recipe Chicken", quantity: 2 },
      { item: "Zinger Burger", quantity: 2 },
      { item: "Fries", quantity: 1 },
    ],
    status: "pending",
    time: "2025-02-12T11:36:48.000Z",
  },
  {
    id: "d4e5f6a7-8b9c-4d1e-9a2b-7c8d9e0f1a2b",
    items: [
      { item: "Zinger Burger", quantity: 3 },
      { item: "Fries", quantity: 2 },
    ],
    status: "pending",
    time: "2025-02-12T11:36:48.000Z",
  },
  {
    id: "e7f8g9h0-1i2j-3k4l-5m6n-7o8p9q0r1s2t",
    items: [
      { item: "Original Recipe Chicken", quantity: 4 },
      { item: "Fries", quantity: 3 },
    ],
    status: "pending",
    time: "2025-02-12T11:36:48.000Z",
  },
];


// Define your routes here
router.get('/getInCompleteOrders', async (req, res) => {
  //console.log('ok')
  res.json(order);
}
);


router.post('/placeOrder', async (req, res) => {
  //console.log(req.body);
  res.json({message: 'Order placed successfully'});
})


module.exports = router;