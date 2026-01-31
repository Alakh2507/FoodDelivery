
 import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },
    // ⚠️ Always hash password using bcrypt

    cartData: { type: Object, default: {} }
  },
  {
    minimize: false
  }
);


 export  const userModel=mongoose.model("user",userSchema);
