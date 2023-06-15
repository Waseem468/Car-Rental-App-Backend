const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const UserSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      isAccountVerified: {
        type: Boolean,
        default: false
    },
    accountVerificationToken : String,
    accountVerificationExpires : Date,
    accountVerificationTokenExpires : Date,
    passwordChangedAt: Date,
    passwordRestToken: String,
    passwordResetExpires: Date,
},
{
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    },
    timestamps: true
})
const User= new mongoose.model("users", UserSchema);
module.exports= User;