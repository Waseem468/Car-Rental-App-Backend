const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.DB_URL
const database = process.env.DATABASE
mongoose.connect(URL+database)
.then((res)=>{
    console.log('connection is successfull')
}).catch(err=>console.log(err));
