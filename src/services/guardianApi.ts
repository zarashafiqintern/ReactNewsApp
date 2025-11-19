import type { NewsResponse } from '../types/news';

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const BASE_URL = 'https://content.guardianapis.com/search';

export const fetchGuardianNews = async (query: string = 'technology'): Promise<NewsResponse> => {
  const response = await fetch(
    `${BASE_URL}?q=${query}&api-key=${GUARDIAN_API_KEY}&show-fields=thumbnail,trailText,byline`
  );

  if (!response.ok) {
    throw new Error(`Guardian API Error: ${response.status} - ${response.statusText}`);
  }

  const data = await response.json();

  return {
    status: data.response.status,
    response: {
      docs: data.response.results.map((article: any) => ({
        id: article.id,
        title: article.webTitle,
        description: article.fields?.trailText || 'No description available',
        url: article.webUrl,
        publishedAt: article.webPublicationDate,
        source: 'The Guardian',
        thumbnail: article.fields?.thumbnail || undefined,
        author: article.fields?.byline,
      })),
    },
  };
};
