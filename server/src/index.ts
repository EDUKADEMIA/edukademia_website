import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import registrationRoutes from './routes/registrations';
import guideRoutes from './routes/guide';
import tutorialRoutes from './routes/tutorials';

dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/edukademia';
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.use('/api/registrations', registrationRoutes);
app.use('/api/guide', guideRoutes);
app.use('/api/tutorials', tutorialRoutes);

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
