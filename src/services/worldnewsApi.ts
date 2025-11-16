const WORLD_NEWS_API_KEY = import.meta.env.VITE_WORLD_NEWS_API_KEY;
const BASE_URL = 'https://newsdata.io/api/1/news';

export const fetchWorldNews = async (query: string = 'technology') => {
  const response = await fetch(
    `${BASE_URL}?apikey=${WORLD_NEWS_API_KEY}&q=${query}&language=en`
  );
  
  if (!response.ok) throw new Error('Failed to fetch World News');
  
  return response.json();
};
