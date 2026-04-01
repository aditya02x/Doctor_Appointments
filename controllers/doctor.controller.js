import Doctor from '../models/Doctor.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const doctorRegister = async (req, res) => {
    try {
        const { name, email, password, specialization, experience, fees } = req.body;
        if (!name || !email || !password || !specialization || !experience || !fees) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const existDoctor = await Doctor.findOne({ email });
        if (existDoctor) {
            return res.status(400).json({ message: "Doctor already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newDoctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            specialization,
            experience,
            fees
        });

        await newDoctor.save();
        res.status(201).json({ message: "Doctor registered successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const existDoctor = await Doctor.findOne({ email });
        if (!existDoctor) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!existDoctor.isApproved) {
            return res.status(403).json({ message: "Your account is not approved yet" });
        }

        const isMatch = await bcrypt.compare(password, existDoctor.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: existDoctor._id, role: 'doctor' },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            message: "Doctor logged in successfully",
            token,
            doctor: {
                id: existDoctor._id,
                name: existDoctor.name,
                email: existDoctor.email,
                specialization: existDoctor.specialization,
                fees: existDoctor.fees
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};