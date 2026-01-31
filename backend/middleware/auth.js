import jwt from 'jsonwebtoken'

const authMiddleware=async(req,res,next)=>{
const secret=process.env.JWT_SECRET;
const {token}=req.headers;
if(!token){
    return res.json({success:false,message:"Not Authorized Login Again "})
}
try{
const token_decode=jwt.verify(token,secret)
 // <-- put userId into body
const ap=req.body.userId=token_decode.id;
console.log(ap)
next();
}catch(err){
console.log(err);
res.json({success:false,message:"Error"});
}
}

export default authMiddleware;