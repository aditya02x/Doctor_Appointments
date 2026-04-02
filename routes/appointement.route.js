import express from "express";
import { bookAppointment, cancelAppointment, getAllAppointements, getAppointments, getDoctorAppointments } from "../controllers/appointement.controllers.js";
import authmiddeware from "../middlewares/auth.middleware.js";
import doctorMiddleware from "../middlewares/doctor.middleware.js";
const router = express.Router();

router.post('/book',authmiddeware , bookAppointment)
router.get('/my-appointments', authmiddeware, getAppointments);
router.get('/doctor-appointments', doctorMiddleware, getDoctorAppointments);
router.get('/all-appointments', authmiddeware, getAllAppointements);
router.put('/cancel/:id', authmiddeware, cancelAppointment);
export default router;