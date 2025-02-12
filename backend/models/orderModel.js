const mongoose = require('mongoose');

const posSchema = new mongoose.Schema({
    items: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            category: { type: String, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true },
    isComplete: {type: Boolean,required: true, default: false},
    time: { type: Date, required: true }
});

const Order = mongoose.model('Order', posSchema);

module.exports = Order;