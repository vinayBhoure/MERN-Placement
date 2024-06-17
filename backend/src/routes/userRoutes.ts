import express from 'express';
import { newUser } from '../controllers/newUser.js';
const router = express.Router();

// base route: /api/v1/user
router.post('/new', newUser)

export default router;