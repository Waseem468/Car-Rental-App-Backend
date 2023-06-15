const mongoose = require('mongoose');
const bcrypt = require('bcrypt');  // for hashing password

const AdminSchema =new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact:{
        type:Number
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
}
);

const AdminModel = mongoose.model('admin', AdminSchema);
module.exports =  AdminModel;
