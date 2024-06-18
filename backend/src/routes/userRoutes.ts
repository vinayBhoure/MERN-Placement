import express from 'express';
import { newUser, getAllUsers, getUser, deleteUser } from '../controllers/User.js';
import { adminOnly } from '../middlewares/auth.js';
const router = express.Router();

// base route: /api/v1/user
router.post('/new', newUser)
router.get("/all", adminOnly, getAllUsers);
router.get("/:id", getUser);
router.delete("/:id", adminOnly, deleteUser)

export default router;