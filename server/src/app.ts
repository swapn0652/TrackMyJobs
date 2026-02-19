import express from 'express';
import cors from 'cors';
import authRoutes  from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import interviewRoundsRoutes from './routes/interviewRounds';
import jobsRoutes from './routes/jobs';
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
  console.log('GET / called');
  res.status(200).send('Server is live!');
});

export default app;
