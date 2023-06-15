const express = require("express")
const app = express();
const cors = require("cors")
require("./src/DB/server")
const CarRouter = require("./src/Routers/CarRouter")
const UserRouter = require("./src/Routers/UserRouter")
const AdminRouter = require("./src/Routers/AdminRouters")
const OrderRouter = require("./src/Routers/OrderRouter")

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