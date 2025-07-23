const express=require('express')
const mongoose=require("mongoose")
const app=express()
require("dotenv").config()
const PORT=process.env.PORT
const Product=require("./Routes/Product")
const User=require("./Routes/User")
const cors=require("cors")
app.use(cors())
mongoose.connect(process.env.Mongo_URI)
    .then(()=> console.log("MongoDB connected"))
    .catch((err)=> console.log("MongoDN connection errr",err))
app.use(express.json())
app.use("/Products",Product)
app.use("/Users",User)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${PORT}`)
})