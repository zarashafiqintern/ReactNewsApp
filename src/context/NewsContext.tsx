import { useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useShuffledArticles } from '../hooks/useShuffledArticles';
import { filterArticles, extractAuthors } from '../utils';
import type { NewsContextType, SourceFilterType, FiltersState } from '../types/news';
import { INITIAL_FILTERS, NEWS_SOURCES, NewsContext } from './news.constants';
import { useDebounce } from '../utils/debounce';

interface NewsProviderProps {
  children: ReactNode;
}

export function NewsProvider({ children }: NewsProviderProps) {
  const [searchQuery, setSearchQuery] = useState('Politics');

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [filters, setFilters] = useState<FiltersState>(INITIAL_FILTERS);
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setFilters((prev) => ({ ...prev, authorFilter: '' }));
  }, [filters.sourceFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, debouncedSearchQuery]);

  const results = useQueries({
    queries: NEWS_SOURCES.map((source) => ({
      queryKey: [...source.queryKey, debouncedSearchQuery],
      queryFn: () => source.fetchFn(debouncedSearchQuery),
    })),
  });

  const [newsData, guardianData, worldNewsData] = results.map((r) => r.data);
  const isLoading = results.some((r) => r.isLoading);

  const shuffledArticles = useShuffledArticles(
    newsData,
    guardianData,
    worldNewsData
  );

  const filteredArticles = useMemo(() => {
    return filterArticles(
      shuffledArticles,
      filters.sourceFilter,
      filters.dateFrom,
      filters.dateTo,
      filters.authorFilter
    );
  }, [shuffledArticles, filters]);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

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
    setSearchQuery(searchQuery);
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
    currentPage,
    setCurrentPage,
    paginatedArticles,
    totalPages,
    itemsPerPage,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
}

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
