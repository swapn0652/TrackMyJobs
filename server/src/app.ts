import express from 'express';
import cors from 'cors';
import authRoutes  from './routes/authRoutes';
import dashboardRoutes from './routes/dashboard';
import interviewRoundsRoutes from './routes/interviewRoundsRoutes';
import jobsRoutes from './routes/jobsRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/interview-rounds', interviewRoundsRoutes);
app.use('/api/jobs', jobsRoutes);

// Test route
app.get('/', (req, res) => {
  res.status(200).send('Server is live!');
});

export default app;
