import express from 'express'
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from '../controllers/Order.js';
import { adminOnly } from '../middlewares/auth.js';

const router = express.Router()

router.post("/new", newOrder );
router.get("/myorders", myOrders );
router.get("/allOrders", adminOnly, allOrders );
router.route("/:id").get(getSingleOrder).put(adminOnly, processOrder).delete(adminOnly, deleteOrder);

export default router;