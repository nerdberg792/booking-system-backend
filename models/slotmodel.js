import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
    professor : {type : mongoose.Schema.Types.ObjectId , ref : "User"} , 
    time : String ,
    bookedBy : {type : mongoose.Schema.Types.ObjectId , ref : "User" , default : null}
  })

  export default mongoose.model("Slot" , SlotSchema)