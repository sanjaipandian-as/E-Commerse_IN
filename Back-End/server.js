const express=require('express')
const mongoose=require("mongoose")
const app=express()
require("dotenv").config()
const PORT=process.env.PORT
const Product=require("./Routes/Product")

mongoose.connect(process.env.Mongo_URI)
    .then(()=> console.log("MongoDB connected"))
    .catch((err)=> console.log("MongoDN connection errr",err))
app.use(express.json())
app.use("/Products",Product)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${PORT}`)
})