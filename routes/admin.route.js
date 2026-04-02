import express from "express";
import { getAllUsers, getAllDoctors ,approveDoctor } from "../controllers/admin.controller";

const router = express.Router();
router.put('/approve/:id', approveDoctor);
router.get('/doctors', getAllDoctors);
router.get('/users', getAllUsers);

export default router;