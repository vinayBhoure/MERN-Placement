import express from 'express'
import { adminOnly } from '../middlewares/auth.js'
import { allCoupons, createPayment, deleteCoupon, getDiscount, newCoupon } from '../controllers/Payment.js';
const router = express.Router()

router.post('/coupon/new', newCoupon);
router.get('/discount', getDiscount);
router.get('/coupon/all', allCoupons);
router.delete('/coupon/delete/:id', adminOnly, deleteCoupon);

router.post('/create', createPayment);

export default router