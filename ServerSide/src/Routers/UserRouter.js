const express = require("express");
const {registerController,loginController} = require("../Controller/usercontroller");

const router = express.Router();

router.post("/register", registerController);

//login
router.post("/login", loginController);

module.exports = router;