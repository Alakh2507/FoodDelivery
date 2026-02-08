import mongoose from 'mongoose'

const orderSchema=new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    atatus:{type:String,default:"Food Processing"},
    date:{type:Date,default :Date.now()},
    payment:{type:Boolean,default:false}
})

const orderMolel=mongoose.model("order",orderSchema)
export default orderMolel;