import type { NewsResponse, NewsAPIResponse } from '../types/news';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';

export const fetchNews = async (query: string = 'technology'): Promise<NewsResponse> => {
  const response = await fetch(
    `${BASE_URL}?q=${query}&apiKey=${NEWS_API_KEY}&sortBy=publishedAt&pageSize=20`
  );
  
  if (!response.ok) throw new Error('Failed to fetch news');
  
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
};
