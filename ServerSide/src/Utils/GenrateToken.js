const jwt = require('jsonwebtoken');

const GenrateToken=(id)=>{
    return jwt.sign({id},process.env.jwt_key,{expiresIn:'20d'})
}
module.exports=GenrateToken;