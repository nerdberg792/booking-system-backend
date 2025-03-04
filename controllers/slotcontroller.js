import Slot from "../models/slotmodel.js";
import User from "../models/usermodel.js";



export const createSlot = async(req , res)=>{
   try{ if(req.user.role !== "professor") return res.status(403).send("Access denied")
    const {time} = req.body ; 
    const slot = new Slot({
        professor : req.user._id , 
        time : time , 
        bookedBy : null
    })
    await slot.save() ; 
    res.status(201).send("Slot created successfully")}
    catch(error){
        res.status(500).send(`create slot failed ${error.message}`)
    }
}

export const viewSlots = async(req , res)=>{
    try{ if(req.user.role !== "student") return res.status(403).send("Access denied")
        const professor = await User.findById(req.body.professor) ; 
        const prof_id = professor._id
        const slots = await Slot.find({ professor: prof_id, bookedBy: null });
        res.status(200).send(slots)}
        catch(error){
            res.status(500).send(`view slots failed ${error.message}`)
        }
}

export const bookSlot = async(req , res)=>{
  try{ if(req.user.role !== "student") return res.status(200).send("access denied") 
    const slot_id = req.body.slot_id ; 
    const slot = await Slot.findById(slot_id) ; 
    if(!slot) return res.status(404).send("Slot not found")
    if(slot.bookedBy) return res.status(400).send("Slot already booked")
    slot.bookedBy = req.user._id ; 
    await slot.save() ; 
    res.status(200).send("Slot booked successfully")}
    catch(error){
        res.status(500).send(`book slot failed ${error.message}`)
    }
}  

export const cancelSlot = async(req , res)=>{
    try{ if(req.user.role !== "professor") return res.status(403).send("Access denied")
    const slot_id = req.body.slot_id ; 
    const slot = await Slot.findById(slot_id) ; 
    const req_id = req.user._id.toString()
    const prof_id = slot.professor.toString()
    
    if(prof_id !== req_id) return res.status(403).send("Access denied . different professor")
    if(!slot) return res.status(404).send("Slot not found")
    if(!slot.bookedBy) return res.status(400).send("Slot not booked")
    slot.bookedBy = null ; 
    await slot.save() ; 
    res.status(200).send("Slot cancelled successfully")}
    catch(error){
        res.status(500).send(`cancel slot failed ${error.message}`)
    }
}

export const deleteSlot = async(req , res)=>{
    try{ if(req.user.role !== "professor") return res.status(403).send("Access denied")
    const slot_id = req.body.slot_id ; 
    const slot = await Slot.findById(slot_id) ; 
    if(!slot) return res.status(404).send("Slot not found")
    const req_id = req.user._id.toString()
    const prof_id = slot.professor.toString()
    if(prof_id !== req_id) return res.status(403).send("Access denied . different professor")
    await slot.deleteOne() ; 
    res.status(200).send("Slot deleted successfully")}
    catch(error){
        res.status(500).send(`delete slot failed ${error.message}`)
    }
}

export const getBookedSlots = async(req , res)=>{
    try{ if(req.user.role !== "professor") return res.status(403).send("Access denied")
    const professor = await User.findById(req.user._id) ; 
    if(!professor) return res.status(404).send("Professor not found")
    const prof_id = professor._id ; 
    const slots = await Slot.find({ professor: prof_id, bookedBy: { $ne: null } });
res.status(200).send(slots)}
catch(error){
    res.status(500).send(`get booked slots failed ${error.message}`)
}
}

export const getMySlots = async(req , res)=>{
    try{ if(req.user.role !== "student") return res.status(403).send("Access denied") ; 
    const student = req.user._id ; 
    const slots = await Slot.find({ bookedBy: student });
    res.status(200).send(slots)}
    catch(error){
        res.status(500).send(`get my slots failed ${error.message}`)
    }
}