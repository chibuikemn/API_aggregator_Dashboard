import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import weatherRoutes from './routes/weather.routes.js';
import newsRoutes from './routes/news.routes.js';
import cryptoRoutes from './routes/crypto.routes.js';

dotenv.config();

console.log('API Key loaded:', process.env.WEATHER_API_KEY ? 'Yes' : 'No');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/weather', weatherRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/crypto', cryptoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
