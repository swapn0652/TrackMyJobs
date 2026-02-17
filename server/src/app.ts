import express from 'express';
import cors from 'cors';
import authRoutes  from './routes/auth';

const app = express();

// Allow all origins explicitly
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
  console.log('GET / called');
  res.status(200).send('Server is live!');
});

export default app;
