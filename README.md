# API Aggregator Dashboard

## Setup

```bash
cd server
npm install
```

## Configuration

1. Copy `server/.env.example` to `server/.env`
2. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
3. Add your API key to `server/.env`:
   ```
   WEATHER_API_KEY=your_actual_api_key
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

## Environment

Copy `server/.env.example` to `server/.env` and configure as needed.
