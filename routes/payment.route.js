import express from 'express '
import { createOrder, getKey, verifyPayment } from '../controllers/payements.controller'
const router = express.Router()


router.get('/key',getKey)
router.post('create-order',createOrder)
router.post('/verify',verifyPayment)

export default router;