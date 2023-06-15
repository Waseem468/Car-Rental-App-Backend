const placeOrders = require('../Model/PlaceOrderSchema');
const {findById, findByIdAndDelete} = require('../Model/userSchema');

const postOrder = async (req, res) => {
    try {
        let data = new placeOrders(req.body);
        let createOrder = await data.save();
        res.status(201).send(createOrder)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
};


const getOrders = async (req, res) => {
    try {
        const userID = req.params.id
        const exitsOrders = await placeOrders.find({ userId: userID });
        res.status(200).json({
            status: "success",
            data: exitsOrders,
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: "error",
            message: "Your order not Exists",
        });
    }
};


const deleteOrder = async (req, res) => {
    try {
        const ID = req.params.id;
        const deleteTheData = await placeOrders.findByIdAndDelete(ID);
        res.send(deleteTheData)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}

const updateOrder = async (req, res) => {
    try {
        const ID = req.params.id;
        const updateTheData = await placeOrders.findByIdAndUpdate({ID}, req.body, { new: true });
        res.status(201).send(updateTheData)
    } catch (error) {
        res.status(400).send({ message: error.message })
    }
}



module.exports = { postOrder, getOrders, deleteOrder, updateOrder };