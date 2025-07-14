import express from 'express';
import cors from 'cors';
import formRoutes from './routes/formRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/forms', formRoutes);

export default app;
