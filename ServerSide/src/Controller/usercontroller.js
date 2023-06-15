const { hashPassword, comparePassword } = require("../helper/authHelper");
const jwt = require("jsonwebtoken");
const userModel = require("../Model/userSchema");
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //validation
    if (!name || !email || !password ) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check user
    const existuser = await userModel.findOne({ email: email });
    //existing user
    if (existuser) {
      return res.status(200).json({
        success: true,
        message: "User Already Registered Please Login",
      });
    }

    //new register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Registration Failed",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user is not registered",
      });
    }
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(200).json({
        success: false,
        message: "Invalid Password",
      });
    }
    //token create
    const token = await jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "20d",
    });
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
module.exports = { registerController, loginController };