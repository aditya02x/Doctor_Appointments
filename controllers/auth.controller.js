import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
    try {
        const {name,email,password ,phone} = req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }

        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message:"User already exist"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = new User({
            name,
            email,
            password : hashedPassword,
            phone
        })

        await newUser.save()
        res.status(201).json({message:"User registered successfully"})


        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error"})
        
    }
}

export const login =async (req,res)=>{
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).json({message:"Please fill all the fields"})
        }

        const existUser = await User.findOne({email})
        if(!existUser){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const isMatch = await bcrypt.compare(password,existUser.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }

       const token = jwt.sign(
  { id: existUser._id, role: existUser.role },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
)


        res.status(200).json({message:"Login successful", token, user:{
            id:existUser._id,
            name:existUser.name,
            email:existUser.email,
            role:existUser.role
        }})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server error"})
    }
}