import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import dotenv from "dotenv";


export const signup = async (req , res)=>{
   try {const {username , email , password , role} = req.body ; 
    const hashedPassword = await bcrypt.hash(password , 10) ; 
    const user = await User.findOne({email}) ; 
    if(user){
        return res.status(400).send("This email is already in use")
    }
    const newUser = new User({
        userName : username , 
        email : email , 
        password : hashedPassword , 
        role : role , 
    })
    await newUser.save() ; 
    res.status(201).send("User created successfully")}
    catch(error){
        res.status(500).send(`signup failed ${error.message}`)
    }
}

export const login = async (req , res)=>{
    try {const {email , password} = req.body ; 
    const user = await User.findOne({email}) ; 
    if(!user) return res.status(400).send("User not found")
    const isMatch = await bcrypt.compare(password , user.password) ; 
    if(!isMatch) return res.status(400).send("Invalid password")
    const token = jwt.sign({id : user._id} , process.env.SECRET) ; 
    res.status(200).send({token , id : user._id , role : user.role , username : user.userName})
}   
catch(error){
    res.status(500).send(`login failed ${error.message}`)
}
}


