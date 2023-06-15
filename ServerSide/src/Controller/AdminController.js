const ExpressAsyncHandler = require('express-async-handler');
const AdminModel = require('../Model/AdminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const ValidateDbID = require('../Utils/ValidateID');
const GenrateToken = require('../Utils/GenrateToken');
const SECRET_KEY = process.env.SECRET_KEY

const AdminRegisterMethod = async (req, res) => {
    try {
        let { password, email } = req.body;
        let HashPassword = await bcrypt.hash(password, 10);
        let userAdmin = await AdminModel.findOne({ email });
        if (userAdmin) {
            return res.status(400).json({ status: "Failed", field: "email", message: "Email already exist!!" })
        }
        let newUserAdmin = await new AdminModel({
            ...req.body,
            password: HashPassword
        });
        newUserAdmin = await newUserAdmin.save();
        res.status(201).json({ status: 'success', user: newUserAdmin })
    }

    catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });
    }

}

const AdminLoginMethod = ExpressAsyncHandler(async (req, res) => {
    try {
        let admin = await AdminModel.findOne({ email: req.body.email });
        if (admin) {
            let CompPassword = await bcrypt.compare(req.body.password, admin.password)
            if (CompPassword) {
                const token = await jwt.sign({ _id: admin._id }, SECRET_KEY)
                res.status(200).send({ status: "Successfully login", token: token, name: admin.Name, AdminId: admin._id })
            } else {
                res.status(400).send({ status: 'Failed', message: 'No data found' })
            }
        }
        else {
            res.status(401).send({ status: "fail", message: "User Details Not Match" })
        }
    }
    catch (err) {
        res.status(400).json({ status: "Failed", message: err.message });

    }
})

module.exports={AdminLoginMethod,AdminRegisterMethod}
