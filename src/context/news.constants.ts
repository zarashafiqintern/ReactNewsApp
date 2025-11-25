import { createContext } from "react";
import type { FiltersState, NewsContextType } from "../types/news";
import { fetchNews } from "../services/newsApi";
import { fetchGuardianNews } from "../services/guardianApi";
import { fetchWorldNews } from "../services/worldnewsApi";

export const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NEWS_SOURCES = [
  { key: 'news', queryKey: ['news'], fetchFn: fetchNews },
  { key: 'guardian', queryKey: ['guardian-news'], fetchFn: fetchGuardianNews },
  { key: 'worldNews', queryKey: ['world-news'], fetchFn: fetchWorldNews },
];

export const INITIAL_FILTERS: FiltersState = {
    sourceFilter: 'all',
    dateFrom: '',
    dateTo: '',
    authorFilter: '',
    author: undefined,
    source: undefined
};
