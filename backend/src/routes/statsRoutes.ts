import express from 'express';
import { getBarInfo, getDashboardInfo, getLineInfo, getPieInfo } from '../controllers/Stats.js';
import { adminOnly } from '../middlewares/auth.js';
const router = express.Router();

router.get("/stats", adminOnly, getDashboardInfo);
router.get("/bar", adminOnly, getBarInfo);
router.get("/line", adminOnly, getLineInfo);
router.get("/pie", adminOnly, getPieInfo);

export default router;