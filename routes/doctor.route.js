import express from 'express';
import { doctorRegister ,doctorLogin } from '../controllers/doctor.controller.js';
const router = express.Router();


router.post('/register', doctorRegister);
router.post('/login', doctorLogin);

export default router;