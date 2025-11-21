import type { Article, SourceFilterType } from '../types/news';

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const isDateInRange = (
  articleDate: Date,
  dateFrom: string,
  dateTo: string
): boolean => {
  if (dateFrom && articleDate < new Date(dateFrom)) return false;
  if (dateTo && articleDate > new Date(dateTo)) return false;
  return true;
};

export const getAuthorText = (author: string | string[] | undefined): string | null => {
  if (!author) return null;

  if (Array.isArray(author)) {
    const validAuthors = author.filter((a) => a && a.trim() !== '');
    return validAuthors.length > 0 ? validAuthors.join(', ') : null;
  }
  
  if (typeof author === 'string' && author.trim() !== '') {
    return author.trim();
  }

  return null;
};

export const normalizeAuthor = (author: string | string[] | undefined): string => {
  if (!author) return '';
  return Array.isArray(author) ? author.join(', ').trim() : author.trim();
};

export const matchesSourceFilter = (
  article: Article,
  sourceFilter: SourceFilterType
): boolean => {
  if (sourceFilter === 'all') return true;

  const src = article.source?.toLowerCase() || '';
  const id = article.id?.toLowerCase() || '';

  switch (sourceFilter) {
    case 'newsapi':
      return id.includes('newsapi') || 
             (!src.includes('guardian') && !src.includes('world news'));
    case 'guardian':
      return src.includes('guardian') || src === 'the guardian';
    case 'worldnews':
      return src.includes('world news') || 
             id.includes('worldnews') ||
             (!src.includes('guardian') && !id.includes('newsapi'));
    default:
      return true;
  }
};

export const filterArticles = (
  articles: Article[],
  sourceFilter: SourceFilterType,
  dateFrom: string,
  dateTo: string,
  authorFilter: string
): Article[] => {
  return articles.filter((article) => {
    if (!matchesSourceFilter(article, sourceFilter)) return false;

    const articleDate = new Date(article.publishedAt);
    if (!isDateInRange(articleDate, dateFrom, dateTo)) return false;

    if (authorFilter) {
      const articleAuthor = normalizeAuthor(article.author);
      if (articleAuthor !== authorFilter) return false;
    }

    return true;
  });
};

export const extractAuthors = (
  articles: Article[],
  sourceFilter: SourceFilterType
): string[] => {
  const filteredBySource = articles.filter((article) =>
    matchesSourceFilter(article, sourceFilter)
  );

  const authors = new Set<string>();

  filteredBySource.forEach((article) => {
    const author = normalizeAuthor(article.author);
    if (author) authors.add(author);
  });

  return Array.from(authors).sort();
};

export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string
): void => {
  const target = e.target as HTMLImageElement;
  target.src = fallbackSrc;
  target.alt = '_';
};

export const openInNewTab = (url: string): void => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const encodeId = (id: string): string => {
  return encodeURIComponent(id);
};
