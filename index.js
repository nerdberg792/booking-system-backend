import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes.js" ; 
import slotRoutes from "./routes/slotRoutes.js" ; 
import dotenv from "dotenv";

dotenv.config();

const app = express();
const SECRET = process.env.SECRET;
app.use(cors());

app.use(express.json());
const db_uri = process.env.MONGO_URI ; 
mongoose.connect(
  db_uri
) ; 





app.get("/",(req , res)=>{
  res.send("Hello World")
})
app.use("/user" , userRoutes) ; 
app.use("/slot" , slotRoutes) ; 


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
