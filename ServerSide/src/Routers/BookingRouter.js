const express =require("express");
const router = express.Router();
const PlaceOrder = require('../Model/PlaceOrderSchema');
require('dotenv').config();

router.post('/postorders',  async (req, res)=>{
    try {
        let newBooking =new PlaceOrder({...req.body});
        let datasave = await newBooking.save();
        res.status(201).send(datasave);
    } catch (err) {
        res.status(400).json({message:err.message});
    }
});

router.get('/getorders', async (req, res)=>{
    try {
        const bookingOrders = await PlaceOrder.find();
        res.send(bookingOrders);
    } catch (error) {
        return res.status(400).json(error);
        
    }
})

module.exports = router;