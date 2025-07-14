import express from 'express';
import cors from 'cors';
import formRoutes from './routes/formRoutes.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://form-creator-two.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());
app.use('/api/forms', formRoutes);

export default app;
