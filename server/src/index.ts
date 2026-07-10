import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health';
import uploadRoutes from './routes/upload';
import parseRoutes from './routes/parse';
import { getPort } from './utils/env';

dotenv.config();

const app = express();
const port = getPort();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'DependLens API is running' });
});

app.use('/api', healthRoutes);
app.use('/api', uploadRoutes);
app.use('/api', parseRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
