const mongoose=require('mongoose');

const ValidateDbID=(id)=>{
    const ID=mongoose.Types.ObjectId.isValid(id)
    if(!ID) throw new Error("User id is Invalid");

}
module.exports=ValidateDbID;