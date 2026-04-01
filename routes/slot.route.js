import express from 'express';
const router = express.Router();
import { createSlot } from '../controllers/slot.controller';
import doctorMiddleware from '../middleware/doctor.middleware';
router.post('/create', doctorMiddleware, createSlot);

export default router;