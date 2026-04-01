import Appointment from "../models/appointment.model.js";
import Slot from '../models/Slot.model.js';
import Doctor from '../models/Doctor.model.js';

export const bookAppointment = async (req, res) => {
    try {
        const { doctorId, slotId } = req.body;
        const patientId = req.user._id;

        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        const amount = doctor.fees;

        const slot = await Slot.findById(slotId);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }
        if (slot.isBooked) {
            return res.status(400).json({ message: 'Slot already booked' });
        }

        const newAppointment = new Appointment({
            patientId,
            doctorId,
            slotId,
            amount,
            appointmentDate: slot.date
        });

        await newAppointment.save();

        slot.isBooked = true;
        await slot.save();

        res.status(201).json({ message: 'Appointment booked successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getAppointments = async (req, res) => {
    try {
        const patientId = req.user._id;
        const appointments = await Appointment.find({ patientId }).populate('doctorId', 'name specialization').populate('slotId', 'date startTime endTime');
        res.status(200).json({ appointments });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}