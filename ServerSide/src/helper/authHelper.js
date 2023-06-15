const bcrypt = require("bcrypt");
const hashPassword = async (password) => {
  try {
    const saltRound = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRound); //user se bheja gya password and salt ko isme pass kiya jayega
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

//yaha compae hoga password ka
const comparePassword = async (password, hashedPassword) => {
  //password and hashedpasword ko pass kiya jayega
  return bcrypt.compare(password, hashedPassword); //direct return kara diye hai
};

module.exports = { hashPassword, comparePassword };