import Doctor from "../models/Doctor.model.js";
import User from "../models/user.model.js";

export const approveDoctor = async (req, res) => {
    try {
        const doctorId = req.params.id;
        
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        doctor.isApproved = true;
        await doctor.save();
        
        res.status(200).json({ message: "Doctor approved successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find().select("-password");
        res.status(200).json({ doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};