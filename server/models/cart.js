const mongoose = require(`mongoose`)

let cartSchema = new mongoose.Schema({
    userId: { type: String },
    products: [{
        productId: { type: String },
        name: {type: String },
        quantity: { type: Number, required: true, min: [1, 'Quantity can not be less then 1.'], default: 1 },
        price: Number
    }],
    bill: { type: Number, required: true, default: 0 }
});

module.exports = Cart = mongoose.model('carts',cartSchema);