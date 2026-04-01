import Doctor from '../models/Doctor.model.js';

export const doctorregister = async (req, res) => {
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
            password : hashedPassword,
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


