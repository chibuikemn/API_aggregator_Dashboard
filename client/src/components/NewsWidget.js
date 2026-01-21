import React, { useState, useEffect } from 'react';
import { NewsSkeleton } from './LoadingSkeleton';
import ErrorState from './ErrorState';

const NewsWidget = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topic, setTopic] = useState('tech');
  const [page, setPage] = useState(1);

  const fetchNews = async (newTopic = topic, newPage = 1) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:5000/api/news?topic=${newTopic}&page=${newPage}&pageSize=5`);
      if (!response.ok) throw new Error('Failed to fetch news');
      const data = await response.json();
      setNews(data.articles || []);
      setPage(newPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleTopicChange = (newTopic) => {
    setTopic(newTopic);
    fetchNews(newTopic, 1);
  };

  if (loading) return <NewsSkeleton />;
  if (error) return <ErrorState error={error} onRetry={() => fetchNews()} title="News Unavailable" />;

  return (
    <div className="card">
      <div className="card-header">
        <h3>Latest News</h3>
        <div className="topic-tabs">
          {['tech', 'business', 'science'].map(t => (
            <button
              key={t}
              className={`topic-tab ${topic === t ? 'active' : ''}`}
              onClick={() => handleTopicChange(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="news-item">
            <h4 className="news-title">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h4>
            <p className="news-description">{article.description}</p>
            <div className="news-meta">
              <span className="news-source">{article.source}</span>
              <span className="news-date">
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pagination">
        <button 
          className="btn btn-sm" 
          onClick={() => fetchNews(topic, Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button 
          className="btn btn-sm" 
          onClick={() => fetchNews(topic, page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default NewsWidget;