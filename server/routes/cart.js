const router = require(`express`).Router();
const cartModel = require(`../models/cart`);

const productModel = require('../models/products');
const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')








// read all records
router.get(`/cart`, async (req, res) =>
{
    let token;
    await jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decoded)=>{
        if (err) return res.status(401).send('user not authorized!');
        token=decoded;
    });

    let user = await userModel.findOne({email:token.email});
    let cart = await cartModel.findOne({userId: user._id});

    if(cart)
        return res.status(200).send(cart);
    return res.status(404).send({errorMessage:`User do not have any items in cart.`})
})

/* add elements to cart or update quantities */
router.post(`/cart`, async (req, res) =>
{
    let token;
    await jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decoded)=>{
        if (err)
            return res.status(401).send('user not authorized!');
        token=decoded;
    });
    let user = await userModel.findOne({email:token.email});
    const { productId, quantity } = req.body;

    console.log(`00. Request data: {user: ${user}, productID: ${productId}, quantity:${quantity}}`);

    try{
        let cart = await cartModel.findOne({userId: user._id});
        let product = await productModel.findOne({_id: productId});

        if(!product) res.status(404).send('Item not found!');

        let price = product.price;
        let name = product.name;

        if(!cart){ //create cart if not exists 
            cart = await Cart.create({
                userId: user._id,
                products: [{ productId, name, quantity, price }],
                bill: quantity*price
            });
            console.log(`01. cart was created! ${cart}`);
            return res.status(201).json(cart);
        }
        console.log(`01. cart was found! ${cart}`);

        let itemIndex = cart.products.findIndex(p => p.productId == productId);
        if(itemIndex === -1){ // Check if product exists or not
            cart.products.push({ productId, name, quantity, price });
            console.log(`02. update product data ${cart}`);
        }
        else{
            product = cart.products[itemIndex];
            product.quantity += quantity;
            cart.products[itemIndex] = product;
            console.log(`02. update product data ${cart}`);
        }

        cart.bill += quantity*price;
        cart = await cart.save();
        console.log(`03. cart was saved! ${cart}`);

        return res.status(200).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({errorMessage:"Something went wrong"});
    }
})

/* delete product from cart*/
router.delete(`/cart/:itemId`, async (req, res) =>
{
    let token;
    await jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decoded)=>{
        if (err)
            return res.status(401).send('user not authorized!');
        token=decoded;
    });
    let user = await userModel.findOne({email:token.email});
    const productId = req.params.itemId;
    try{
        let cart = await Cart.findOne({userId: user._id});
        let itemIndex = cart.products.findIndex(p => p.productId == productId);
        if(itemIndex > -1)
        {
            let product = cart.products[itemIndex];
            cart.bill -= product.quantity*product.price;
            cart.products.splice(itemIndex,1);
        }
        cart = await cart.save();
        return res.status(201).json(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({errorMessage:"Something went wrong"});
    }
})

module.exports = router