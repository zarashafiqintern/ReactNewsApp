import { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { useQueries } from '@tanstack/react-query';
import { fetchNews } from '../services/newsApi';
import { fetchGuardianNews } from '../services/guardianApi';
import { fetchWorldNews } from '../services/worldnewsApi';
import { useShuffledArticles } from '../hooks/useShuffledArticles';
import { filterArticles, extractAuthors } from '../utils';
import type { NewsContextType, SourceFilterType, FiltersState } from '../types/news';

const NewsContext = createContext<NewsContextType | undefined>(undefined);

const NEWS_SOURCES = [
  { key: 'news', queryKey: ['news'], fetchFn: fetchNews },
  { key: 'guardian', queryKey: ['guardian-news'], fetchFn: fetchGuardianNews },
  { key: 'worldNews', queryKey: ['world-news'], fetchFn: fetchWorldNews },
];

const INITIAL_FILTERS: FiltersState = {
  sourceFilter: 'all',
  dateFrom: '',
  dateTo: '',
  authorFilter: '',
};

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsProvider = ({ children }: NewsProviderProps) => {

  const [searchQuery, setSearchQuery] = useState('Politics');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('Politics');

  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setFilters((prev) => ({ ...prev, authorFilter: '' }));
  }, [filters.sourceFilter]);

  const results = useQueries({
    queries: NEWS_SOURCES.map((source) => ({
      queryKey: [...source.queryKey, debouncedSearchQuery],
      queryFn: () => source.fetchFn(debouncedSearchQuery),
    })),
  });

  const [newsData, guardianData, worldNewsData] = results.map((r) => r.data);
  const isLoading = results.some((r) => r.isLoading);

  const shuffledArticles = useShuffledArticles(newsData, guardianData, worldNewsData);

  const filteredArticles = useMemo(() => {
    return filterArticles(
      shuffledArticles,
      filters.sourceFilter,
      filters.dateFrom,
      filters.dateTo,
      filters.authorFilter
    );
  }, [shuffledArticles, filters]);

  const availableAuthors = useMemo(() => {
    return extractAuthors(shuffledArticles, filters.sourceFilter);
  }, [shuffledArticles, filters.sourceFilter]);

  const setSourceFilter = (value: SourceFilterType) => {
    setFilters((prev) => ({ ...prev, sourceFilter: value, authorFilter: '' }));
  };

  const setDateFrom = (value: string) => {
    setFilters((prev) => ({ ...prev, dateFrom: value }));
  };

  const setDateTo = (value: string) => {
    setFilters((prev) => ({ ...prev, dateTo: value }));
  };

  const setAuthorFilter = (value: string) => {
    setFilters((prev) => ({ ...prev, authorFilter: value }));
  };

  const clearFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  const hasActiveFilters =
    filters.sourceFilter !== 'all' ||
    filters.dateFrom !== '' ||
    filters.dateTo !== '' ||
    filters.authorFilter !== '';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setDebouncedSearchQuery(searchQuery);
  };

  const value: NewsContextType = {
    searchQuery,
    setSearchQuery,
    debouncedSearchQuery,
    handleSearch,
    filters,
    setSourceFilter,
    setDateFrom,
    setDateTo,
    setAuthorFilter,
    clearFilters,
    hasActiveFilters,
    showFilters,
    setShowFilters,
    isLoading,
    shuffledArticles,
    filteredArticles,
    availableAuthors,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
