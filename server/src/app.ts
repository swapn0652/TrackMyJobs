import express from 'express';
import cors from 'cors';
import authRoutes  from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import interviewRoundsRoutes from './routes/interviewRounds.routes';
import jobsRoutes from './routes/jobs.routes';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload.routes';
import path from 'path';
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
app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);

app.use("/api/upload", uploadRoutes)

// Test route
app.get('/', (req, res) => {
  res.status(200).send('Server is live!');
});

export default app;
