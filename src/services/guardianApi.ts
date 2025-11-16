const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const BASE_URL = 'https://content.guardianapis.com/search';

export const fetchGuardianNews = async (query: string = 'technology') => {
  const response = await fetch(
    `${BASE_URL}?q=${query}&api-key=${GUARDIAN_API_KEY}&show-fields=thumbnail,trailText`
  );
  
  if (!response.ok) throw new Error('Failed to fetch Guardian news');
  
  return response.json();
};
