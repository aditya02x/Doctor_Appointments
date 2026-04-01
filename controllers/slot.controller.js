import Slot  from "../models/Slot.model.js";


export const createSlot = async (req, res) => {
    try {
        const {day , date , startTime , endTime} = req.body;
        const doctorId = req.doctor._id;
        const existSlot = await Slot.findOne({ doctorId, day, date, startTime, endTime });
        if (existSlot) {
            return res.status(400).json({ message: "Slot already exists" });
        }

        const newSlot = new Slot({
            doctorId,
            day,
            date,
            startTime,
            endTime
        });

        await newSlot.save();
        res.status(201).json({ message: "Slot created successfully" });


        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}


export const getSlots = async (req, res) => {
    try {
       const doctorId = req.doctor._id;
       const slots = await Slot.find({ doctorId});
       res.status(200).json({slots});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const getAvailableSlots = async (req, res) => {
    try {
        const doctorId = req.params.doctorId;
        const slots = await Slot.find({doctorId, isBooked: false});
        res.status(200).json({slots});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

