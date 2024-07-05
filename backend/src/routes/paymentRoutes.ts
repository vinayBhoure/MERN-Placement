import express from 'express'
import { adminOnly } from '../middlewares/auth.js'
import { allCoupons, checkStatus, deleteCoupon, getDiscount, newCoupon, phonePeIntent } from '../controllers/Payment.js';
const router = express.Router()

router.post('/coupon/new', adminOnly, newCoupon);
router.get('/discount', getDiscount);
router.get('/coupon/all', allCoupons);
router.delete('/coupon/delete/:id', adminOnly, deleteCoupon);

router.post('/create-payment-intent', phonePeIntent);
router.get('/checkPayment/:transactionId', checkStatus);

export default router