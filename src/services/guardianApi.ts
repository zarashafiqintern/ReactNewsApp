import type { GuardianAPIResponse, GuardianNewsResponse, Article } from '../types/news';
import { v4 as uuidv4 } from 'uuid';

const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const BASE_URL = import.meta.env.VITE_GUARDIAN_BASE_URL;

const extractAuthorsFromGuardian = (
  author?: string,
  tags?: Array<{ id: string; type: string; webTitle: string }>
): string[] => {
  let authors: string[] = [];

  if (author) {
    const cleanedAuthor = author.replace(/^By\s+/i, '').trim(); 
    if (cleanedAuthor && cleanedAuthor !== 'Guardian staff reporter') {
      authors.push(cleanedAuthor);
    }
  }

  if (tags && tags.length > 0) {
    const contributorTags = tags.filter(
      (tag) => tag.type === 'contributor' && tag.webTitle
    );
    if (contributorTags.length > 0) {
      authors = contributorTags.map((tag) => tag.webTitle);
    }
  }

  return authors;
};

export const fetchGuardianNews = async (
  query: string = 'technology'
): Promise<GuardianNewsResponse> => {
  const response = await fetch(
    `${BASE_URL}?q=${query}&api-key=${GUARDIAN_API_KEY}&show-fields=thumbnail,trailText,byline&show-tags=contributor`
  );

  if (!response.ok) {
    throw new Error(`Guardian API Error: ${response.status} - ${response.statusText}`);
  }

  const data: GuardianAPIResponse = await response.json();

  return {
    status: data.response.status,
    response: {
      docs: data.response.results.map((article): Article => {
        const authors = extractAuthorsFromGuardian(
          article.fields?.byline,  
          article.tags
        );

        return {
          id: `guardian-${uuidv4()}`,
          title: article.webTitle,
          description: article.fields?.trailText || '',
          url: article.webUrl,
          publishedAt: article.webPublicationDate,
          source: 'The Guardian',
          thumbnail: article.fields?.thumbnail || '',
          author: authors.length > 0 ? authors : [],
        };
      }),
    },
  };
};
