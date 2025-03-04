import express from "express" ; 
import { createSlot , viewSlots , bookSlot , cancelSlot , deleteSlot , getBookedSlots , getMySlots} from "../controllers/slotcontroller.js" ; 
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = express.Router() ; 


router.post("/create" , authMiddleware , createSlot) ; 
router.get("/view" , authMiddleware , viewSlots) ; 
router.post("/book" , authMiddleware , bookSlot) ; 
router.post("/cancel" , authMiddleware , cancelSlot) ; 
router.post("/delete" , authMiddleware , deleteSlot) ; 
router.get("/booked" , authMiddleware , getBookedSlots) ; 
router.get("/my" , authMiddleware , getMySlots) ; 


export default router ; 