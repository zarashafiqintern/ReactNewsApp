import type { NewsResponse, NewsAPIResponse } from '../types/news';
import { v4 as uuidv4 } from 'uuid';

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/everything';

export const fetchNews = async (query: string = 'technology'): Promise<NewsResponse> => {
  const response = await fetch(
    `${BASE_URL}?q=${query}&apiKey=${NEWS_API_KEY}&sortBy=publishedAt&pageSize=20`
  );

  if (!response.ok) {
    throw new Error(`NewsAPI Error: ${response.status} - ${response.statusText}`);
  }

  const data: NewsAPIResponse = await response.json();

  return {
    status: data.status,
    response: {
      docs: data.articles.map((article) => ({
        id: uuidv4(),
        title: article.title,
        description: article.description || " ",
        url: article.url,
        publishedAt: article.publishedAt,
        source: article.source.name,
        thumbnail: article.urlToImage || "",
        author: article.author ||" ",
      })),
    },
  };
};
