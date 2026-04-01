import express from 'express';
const router = express.Router();
import { createSlot, getSlots } from '../controllers/slot.controller.js';
import doctorMiddleware from '../middleware/doctor.middleware.js';
import { getAvailableSlots } from '../controllers/slot.controller.js';
router.post('/create', doctorMiddleware, createSlot);
router.get('/doctor-slots', doctorMiddleware,getSlots);
router.get('/:doctorId',getAvailableSlots)

export default router;