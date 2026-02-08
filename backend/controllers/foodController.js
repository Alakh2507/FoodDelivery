import foodModel from "../models/foodModel.js";
import fs from 'fs'
import cloudinary from "../config/cloudinary.js";

//add food item

const addFood = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!req.file) {
      return res.json({ success: false, message: "Image is required" });
    }

    // 🔥 Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
      {
        folder: "food-delivery",
      }
    );

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image: result.secure_url,   // ✅ Cloudinary URL
      imageId: result.public_id,  // ✅ Cloudinary public_id
    });

    await food.save();

    res.json({ success: true, message: "Food Added", food });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error adding food" });
  }
};

export default addFood;

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
    // fs.unlink(`uploads/${food.image}`,()=>{});
    await foodModel.findByIdAndDelete(newId);
    res.json({success:true,message:"Food Removed"});
}catch(err){
   res.json({success:true,message:"Error"});
   console.log(err);
}
}

export { addFood ,listFood,removeFood}