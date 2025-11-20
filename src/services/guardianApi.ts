import type { NewsResponse, GuardianAPIResponse } from '../types/news';
import { v4 as uuidv4 } from 'uuid';

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const BASE_URL = 'https://content.guardianapis.com/search';

export const fetchGuardianNews = async (query: string = 'technology'): Promise<NewsResponse> => {
  const response = await fetch(
    `${BASE_URL}?q=${query}&api-key=${GUARDIAN_API_KEY}&show-fields=thumbnail,trailText,byline`
  );

  if (!response.ok) {
    throw new Error(`Guardian API Error: ${response.status} - ${response.statusText}`);
  }

  const data: GuardianAPIResponse = await response.json();

  return {
    status: data.response.status,
    response: {
      docs: data.response.results.map((article) => ({
        id: uuidv4(),
        title: article.webTitle,
        description: article.fields?.trailText || "",
        url: article.webUrl,
        publishedAt: article.webPublicationDate,
        source: 'The Guardian',
        thumbnail: article.fields?.thumbnail,
        author: article.fields?.author,
      })),
    },
  };
};
