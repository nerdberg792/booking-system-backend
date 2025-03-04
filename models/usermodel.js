import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName : String , 
    email : String , 
    password : String , 
    role : String , 
  });


  export default mongoose.model("User" , UserSchema)