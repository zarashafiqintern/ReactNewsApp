export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: string;
  thumbnail?: string;
  author?: string | string[];
  category?: string;
}

export interface NewsResponse {
  status: string;
  totalResults?: number;
  articles?: Article[];
  response?: {
    docs: Article[];
  };
  results?: Article[];
}

export interface NewsAPIArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: NewsAPIArticle[];
}

export interface WorldNewsArticle {
  article_id: string;
  title: string;
  description?: string;
  content?: string;
  link: string;
  pubDate: string;
  source_id?: string;
  image_url?: string;
  creator?: string[];
}

export interface WorldNewsAPIResponse {
  status: string;
  results: WorldNewsArticle[];
}

export interface GuardianTag {
  id: string;
  type: string;
  webTitle: string;
}

export interface GuardianFields {
  trailText?: string;
  thumbnail?: string;
  byline?: string;
}

export interface GuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  fields?: GuardianFields;
  tags?: GuardianTag[];
}

export interface GuardianAPIResponse {
  response: {
    status: string;
    results: GuardianArticle[];
  };
}

export interface GuardianNewsResponse {
  status: string;
  response: {
    docs: Article[];
  };
}

export type SourceFilterType = 'all' | 'newsapi' | 'guardian' | 'worldnews';

export interface FiltersState {
  sourceFilter: SourceFilterType;
  dateFrom: string;
  dateTo: string;
  authorFilter: string;
}

export interface NewsContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedSearchQuery: string;
  handleSearch: (e: React.FormEvent) => void;

  filters: FiltersState;
  setSourceFilter: (value: SourceFilterType) => void;
  setDateFrom: (value: string) => void;
  setDateTo: (value: string) => void;
  setAuthorFilter: (value: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;

  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  
  isLoading: boolean;
  shuffledArticles: Article[];
  filteredArticles: Article[];
  availableAuthors: string[];
}
