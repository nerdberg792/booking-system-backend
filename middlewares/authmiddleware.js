import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

export const authMiddleware = async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      console.log("Raw token:", token); 
  
      if (!token) {
        return res.status(401).send("No token provided");
      }
  
      token = token.replace("Bearer ", "");
      console.log("Processed token:", token);
  
      const decoded = jwt.verify(token, SECRET);
      console.log("Decoded token:", decoded);
  
      req.user = await User.findById(decoded.id);
      if (!req.user) {
        return res.status(401).send("User not found");
      }
  
      next();
    } catch (error) {
      console.error("JWT Error:", error.message);
      res.status(401).send("Invalid or expired token");
    }
  };
  