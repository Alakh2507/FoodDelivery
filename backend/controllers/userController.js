import { userModel } from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import dotenv from "dotenv"

dotenv.config();
const jwtsecret = process.env.JWT_SECRET

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })

    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error" });
    }
}

//create token
const createToken = (id) => {
    return jwt.sign({ id }, jwtsecret, { expiresIn: "7d" });
};

//register user
const registerUser = async (req, res) => {
    const { name, password, email } = req.body;

    try {
        //empty check
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Email and password required" })
        }

        //validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        //checking is user already exists
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exist" })
        }

        //password 
        if (!validator.isLength(password, { min: 6 })) {
            return res.json({ success: false, message: "Password must be at least 6 digit." })
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (err) {
        console.log(err);
        res.json
    }

}

export { loginUser, registerUser }