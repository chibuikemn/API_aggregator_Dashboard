const API_BASE = 'http://localhost:5000/api';

export const cryptoService = {
  getPrices: async (coins = 'bitcoin,ethereum,cardano') => {
    const response = await fetch(`${API_BASE}/crypto/prices?coins=${coins}`);
    return response.json();
  },

  getChart: async (coinId = 'bitcoin', days = 7) => {
    const response = await fetch(`${API_BASE}/crypto/chart/${coinId}?days=${days}`);
    return response.json();
  }
};