const express=require("express")
const E_COM=express.Router()
const Product=require("../Models/Product")

E_COM.post("/POST",async(req,res)=>{
    try {
        const {name, description, price, image, stock, category} = req.body;
        const newProduct=new Product({name,description,price,image,stock,category})
        await newProduct.save()
        res.status(200).json({message:"Product created successfully",newProduct})
    } catch (error) {
        res.status(500).json({message:"Error creating product",error})
    }
})

E_COM.get("/Get",async(req,res)=>{
    try {
        const products=await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:"Error fetching product",error}
        )
    }
})

E_COM.get("/Get/:id",async(req,res)=>{
    try {
        const product=await Product.findById(req.params.id)
        if (!product){
            return res.json({message:"Product not found"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:"Error fetching product",error})
    }
})

E_COM.put("/Update/:id",async(req,res)=>{
    try {
        const {name, description, price, image, stock, category} = req.body;
        const updatedproduct=await Product.findByIdAndUpdate(req.params.id,{name,description,price,image,stock,category},{new:true})
        if (!updatedproduct){
            return res.status(400).json({message:"Product not fount"})
        }
        res.status(200).json({message:"Product updated succesfuly",updatedproduct})
    } catch (error) {
        res.status(500).json({message:"Error updatingproduct",error})
    }
})

E_COM.delete("/Delete/:id",async(req,res)=>{
    try {
        
        const deletedproduct=await Product.findByIdAndDelete(req.params.id)
        if (!deletedproduct){
            return res.status(400).json({message:"Product not found"})
        }
        res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message:"Error deleting product",error})
    }
})

module.exports=E_COM