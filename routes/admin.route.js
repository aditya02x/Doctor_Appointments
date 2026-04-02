import express from "express";
import { getAllUsers, getAllDoctors ,approveDoctor } from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();
router.put('/approve/:id', authMiddleware, approveDoctor);
router.get('/doctors', authMiddleware, getAllDoctors);
router.get('/users', authMiddleware, getAllUsers);

export default router;