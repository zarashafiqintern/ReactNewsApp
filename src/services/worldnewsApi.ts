import type { NewsResponse } from '../types/news';

const WORLD_NEWS_API_KEY = import.meta.env.VITE_WORLD_NEWS_API_KEY;
const BASE_URL = 'https://newsdata.io/api/1/news';

export const fetchWorldNews = async (query: string = 'technology'): Promise<NewsResponse> => {
  const response = await fetch(
    `${BASE_URL}?apikey=${WORLD_NEWS_API_KEY}&q=${query}&language=en`
  );
  
  if (!response.ok) {
    throw new Error(`World News API Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();

  return {
    status: data.status,
    response: {
      docs: data.results?.map((article: any) => ({
        id: article.article_id,
        title: article.title,
        description: article.description || article.content || 'No description available',
        url: article.link,
        publishedAt: article.pubDate,
        source: article.source_id || 'World News',
        thumbnail: article.image_url || undefined,
        author: article.creator ? article.creator.join(', ') : undefined,
      })) || [],
    },
  };
};
