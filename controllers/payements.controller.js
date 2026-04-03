import Razorpay from "razorpay";
import Appointment from '../models/appointment.model.js';
import Payment from '../models/PaymentSchema.js'
import crypto from 'crypto'
const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Payment verification failed" });
}

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
            receipt: `receipt_${appointmentId}`
        })

        res.status(200).json({
            order,
            appointmentId
        })

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const verifyPayment = async (req, res) => {
    try {
        // Step 1 — get data from frontend
        const { razorpay_order_id, razorpay_payment_id, 
                razorpay_signature, appointmentId } = req.body;

        // Step 2 — create signature yourself
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        // Step 3 — compare signatures
        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        // Step 4 — find appointment to get amount
        const appointment = await Appointment.findById(appointmentId);

        // Step 5 — save payment to DB
        const payment = new Payment({
            appointmentId,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            amount: appointment.amount,
            status: 'captured',
            paidAt: Date.now()
        });
        await payment.save();

        // Step 6 — update appointment payment status
        await Appointment.findByIdAndUpdate(appointmentId, {
            paymentStatus: 'paid',
            paymentId: razorpay_payment_id
        });

        res.status(200).json({ message: "Payment successful" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};
