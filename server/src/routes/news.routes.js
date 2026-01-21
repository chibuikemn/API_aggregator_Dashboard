import express from 'express';
import { getNews } from '../services/news.service.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { topic, page = 1, pageSize = 10 } = req.query;
    
    if (!topic) {
      return res.status(400).json({ error: 'Topic parameter is required' });
    }

    const pageNum = parseInt(page);
    const pageSizeNum = parseInt(pageSize);

    if (pageNum < 1 || pageSizeNum < 1 || pageSizeNum > 100) {
      return res.status(400).json({ error: 'Invalid page or pageSize parameters' });
    }

    const news = await getNews(topic, pageNum, pageSizeNum);
    
    if (news.articles.length === 0) {
      return res.json({ 
        message: 'No articles found for this topic',
        articles: [],
        totalResults: 0,
        page: pageNum,
        pageSize: pageSizeNum,
        totalPages: 0,
        cached: news.cached
      });
    }

    res.json(news);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch news data',
      message: error.message 
    });
  }
});

export default router;