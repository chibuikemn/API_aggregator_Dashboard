import express from 'express';
import { getCryptoPrices, getCryptoChart } from '../services/crypto.service.js';

const router = express.Router();

router.get('/prices', async (req, res) => {
  try {
    const { coins } = req.query;
    const prices = await getCryptoPrices(coins);
    res.json(prices);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch crypto prices',
      message: error.message 
    });
  }
});

router.get('/chart/:coinId', async (req, res) => {
  try {
    const { coinId } = req.params;
    const { days = 7 } = req.query;
    
    const chart = await getCryptoChart(coinId, parseInt(days));
    res.json(chart);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch crypto chart data',
      message: error.message 
    });
  }
});

export default router;