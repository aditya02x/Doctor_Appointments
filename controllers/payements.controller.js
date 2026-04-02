import Razorpay from "razorpay";
import Appointment from '../models/appointment.js';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const getKey = (req, res) => {
    res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
}

export const createOrder = async (req,res)=>{
    try {
        const {appointmentId }= req.body;

        //find appointment to get amount
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }


        //create razorpay order 
        const order = await razorpay.orders.create({
            amount:appointment.amount *100,
            currency:'INR',
            receipt:'receipt_${appointementid'
        })

        res.status(200).json({
            order,
            appointmentId
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}