import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './config/connectDB.js';
import { globalCatch } from './middlewares/error.js';
const app = express();
const PORT = 3000;
app.use(express.json());

app.get('/', (req, res) => {
 res.send('Express + TypeScript Server');
})

app.use('/api/v1/user', userRoutes);

app.use(globalCatch);

app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
})

connectDB();