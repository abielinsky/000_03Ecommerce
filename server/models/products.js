
const mongoose = require(`mongoose`);

let productsSchema = new mongoose.Schema(
    {
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        weight: { type: Number },
        image: { type: Array },
        category: { type: String }
    },
    {
        collection: `products`
    });

module.exports = mongoose.model(`products`, productsSchema);