import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true },
  type:          { type: String, enum: ['booked', 'cancelled', 'reminder'], required: true },
  recipient:     { type: String, required: true },
  status:        { type: String, enum: ['sent', 'failed'], default: 'sent' },
  sentAt:        { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema);