const router = require(`express`).Router();
const userModel = require("../models/users");
const cartModel = require("../models/cart");
const orderModel = require("../models/order");
const verifyUsersJWTPassword = require("./misc");

router.get(`/orders`, verifyUsersJWTPassword, async (req, res) => {
    let token = req.decodedToken;
    let user = await userModel.findOne({email:token.email});
    let orders = await orderModel.find({userId: user._id});
    
    if (orders) 
        return res.status(200).json(orders);
    return res.status(203).json({errorMessage:`there are no records.`})
});

router.get(`/orders/:id`, verifyUsersJWTPassword, async (req, res) => {
    let token = req.decodedToken;
    let user = await userModel.findOne({email:token.email});
    let order = await orderModel.findOne({userId:user._id, _id: req.params.id});
    console.log('user found: ', user);
    console.log('order: ', order);
    if (order) return res.status(200).json(order);
    return res.status(203).json({errorMessage:`there are no records.`})
});

router.post(`/orders/:paypalPaymentID`, verifyUsersJWTPassword, async (req, res) => {
  try {
    console.log('00. entered to method');
    let token = req.decodedToken;

    console.log('01. token readed', token);
    
    let user = await userModel.findOne({email: token.email});
    let cart = await cartModel.findOne({userId: user._id});

    console.log('02. main entities are readed');

    if (cart) {
        const order = await orderModel.create({
          userId: user._id,
          products: cart.products,
          bill: cart.bill,
          paypalPaymentID: req.params.paypalPaymentID,
        });
        const data = await Cart.findByIdAndDelete({ _id: cart.id });
        return res.status(201).send(order);
    }
    return res.status(404).send("You do not have items in cart");
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router