import type { NewsResponse } from '../types/news';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }>;
}

export const fetchNews = async (query: string = 'technology'): Promise<NewsResponse> => {
  try {
    if (!NEWS_API_KEY) {
      throw new Error('API key not found. Please add VITE_NEWS_API_KEY to .env file');
    }

    const response = await fetch(
      `${BASE_URL}?q=${query}&apiKey=${NEWS_API_KEY}&sortBy=publishedAt&pageSize=20`
    );
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key');
      }
      throw new Error(`Failed to fetch news: ${response.status}`);
    }
    
    const data: NewsAPIResponse = await response.json();
    
    const convertedData: NewsResponse = {
      status: data.status,
      response: {
        docs: data.articles.map((article, index) => ({
          _id: `${index}-${Date.now()}`,
          headline: {
            main: article.title,
          },
          abstract: article.description || '',
          web_url: article.url,
          pub_date: article.publishedAt,
          source: article.source.name,
          multimedia: article.urlToImage
            ? [{ url: article.urlToImage }]
            : undefined,
        })),
      },
    };
    
    return convertedData;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
