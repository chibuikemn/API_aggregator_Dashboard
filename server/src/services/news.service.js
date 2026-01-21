import axios from 'axios';
import cache from '../cache/cacheManager.js';

const BASE_URL = 'https://newsapi.org/v2/everything';

export const getNews = async (topic, page = 1, pageSize = 10) => {
  const API_KEY = process.env.NEWS_API_KEY;
  
  if (!API_KEY) {
    throw new Error('NEWS_API_KEY not found in environment variables');
  }

  const cacheKey = `news_${topic}_${page}_${pageSize}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return { ...cached, cached: true };
  }

  try {
    const { data } = await axios.get(BASE_URL, {
      params: {
        q: topic,
        apiKey: API_KEY,
        page,
        pageSize,
        sortBy: 'publishedAt',
        language: 'en'
      }
    });

    if (data.status === 'error') {
      throw new Error(data.message);
    }

    const normalized = {
      articles: data.articles.map(article => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt,
        urlToImage: article.urlToImage
      })),
      totalResults: data.totalResults,
      page,
      pageSize,
      totalPages: Math.ceil(data.totalResults / pageSize)
    };

    // Cache for 30 minutes (1800 seconds)
    cache.set(cacheKey, normalized, 1800);
    return { ...normalized, cached: false };
  } catch (error) {
    if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    throw error;
  }
};