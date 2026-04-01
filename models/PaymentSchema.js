const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  appointmentId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  razorpayOrderId:    { type: String, required: true },
  razorpayPaymentId:  { type: String, default: '' },
  amount:             { type: Number, required: true },
  status:             { type: String, enum: ['created', 'captured', 'failed'], default: 'created' },
  paidAt:             { type: Date },
}, { timestamps: true });

export default mongoose.model("Payment",payementSchema)