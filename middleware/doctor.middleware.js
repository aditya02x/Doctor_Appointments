import Doctor from '../models/Doctor.model.js';
import jwt from 'jsonwebtoken';

const doctorMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const doctor = await Doctor.findById(decoded.id).select("-password");

    if (!doctor) {
      return res.status(401).json({ message: "Doctor not found" });
    }

    req.doctor = doctor;
    next();

  } catch (error) {
    console.error(error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};

export default doctorMiddleware;