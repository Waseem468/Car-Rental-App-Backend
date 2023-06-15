const express = require("express")
const app = express();
const cors = require("cors")
require("./DB/server")
const CarRouter = require("./Routers/CarRouter")
const UserRouter = require("./Routers/UserRouter")
const AdminRouter = require("./Routers/AdminRouters")
const OrderRouter = require("./Routers/OrderRouter")

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}))

app.use('/car', CarRouter)
app.use('/user', UserRouter)
app.use('/admin', AdminRouter)
app.use('/orders', OrderRouter)


app.listen(5000, ()=>{
    console.log("listening port 5000")
})