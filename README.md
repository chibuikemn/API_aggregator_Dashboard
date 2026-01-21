# API Aggregator Dashboard

## Setup

```bash
cd server
npm install
```

## Configuration

1. Copy `server/.env.example` to `server/.env`
2. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
3. Get a free API key from [NewsAPI](https://newsapi.org/)
4. Add your API keys to `server/.env`:
   ```
   WEATHER_API_KEY=your_actual_weather_key
   NEWS_API_KEY=your_actual_news_key
   ```

## Run

```bash
cd server
npm start
```

Server runs on `http://localhost:5000`

## Test

- Health check: `http://localhost:5000/api/health` - should return `{"status":"OK"}`
- Weather API: `http://localhost:5000/api/weather?city=Dallas`
- News API: `http://localhost:5000/api/news?topic=tech`
- News with pagination: `http://localhost:5000/api/news?topic=tech&page=1&pageSize=5`
- Crypto prices: `http://localhost:5000/api/crypto/prices`
- Crypto chart: `http://localhost:5000/api/crypto/chart/bitcoin?days=1`

## Environment

Copy `server/.env.example` to `server/.env` and configure as needed.
