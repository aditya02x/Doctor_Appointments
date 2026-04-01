import express from 'express';
import { createSlot, getSlots ,getAvailableSlots } from '../controllers/slot.controller.js';
import doctorMiddleware from '../middleware/doctor.middleware.js';

const router = express.Router();
router.post('/create', doctorMiddleware, createSlot);
router.get('/doctor-slots', doctorMiddleware,getSlots);
router.get('/:doctorId',getAvailableSlots)

export default router;