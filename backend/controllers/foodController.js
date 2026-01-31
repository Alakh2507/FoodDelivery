import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item

const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const { name, description, price, category } = req.body;

    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename,
    });
    try{
        await food.save();
        res.json({success:true,message:"Food Added"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//all food list 
const listFood=async(req,res)=>{
try{
       const foods=await foodModel.find({})
       res.json({success:true,message:"data fetch successfull",data:foods})
}catch(err){
    res.json({success:false , message:"Error"})
    console.log(err);
}
}

//remove food item
const removeFood=async(req,res)=>{
try{
    let newId=req.body.id;
    const food=await foodModel.findById(newId);
    //delete the image from uploads folder
    fs.unlink(`uploads/${food.image}`,()=>{});

    await foodModel.findByIdAndDelete(newId);

    res.json({success:true,message:"Food Removed"});
}catch(err){
   res.json({success:true,message:"Error"});
   console.log(err);
}
}


export { addFood ,listFood,removeFood}