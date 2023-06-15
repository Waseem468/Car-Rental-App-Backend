const express =require("express");
const router = express.Router();
const cors = require("cors");

const {postOrder, getOrders, deleteOrder, updateOrder} = require("../Controller/OrderController");

router.post('/', postOrder);
router.get('/:_id', getOrders);
router.delete('/:_id', deleteOrder);
router.put('/:_id', updateOrder);


module.exports = router;