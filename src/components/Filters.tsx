import React, { useMemo } from "react";

interface FiltersProps {
  sourceFilter: string;
  setSourceFilter: (value: string) => void;
  dateFrom: string;
  setDateFrom: (value: string) => void;
  dateTo: string;
  setDateTo: (value: string) => void;
  authorFilter: string;
  setAuthorFilter: (value: string) => void;
  shuffledArticles: any[];
}

export const Filters: React.FC<FiltersProps> = ({
  sourceFilter,
  setSourceFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  authorFilter,
  setAuthorFilter,
  shuffledArticles,
}) => {
  
  const availableAuthors = useMemo(() => {
    const authors = new Set<string>();

    shuffledArticles?.forEach((article) => {
      const rawAuthor = article.byline || article.author || "";

      const author = Array.isArray(rawAuthor)
        ? rawAuthor.join(", ").trim()
        : rawAuthor.trim();

      if (author) authors.add(author);
    });

    return Array.from(authors).sort();
  }, [shuffledArticles]);

  return (
    <div className="bg-white border-t p-4 flex flex-wrap gap-4 z-20">
      <select
        value={sourceFilter}
        onChange={(e) => setSourceFilter(e.target.value)}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="all">All Sources</option>
        <option value="newsapi">News API</option>
        <option value="guardian">The Guardian</option>
        <option value="worldnews">World News</option>
      </select>

      <select
        value={authorFilter}
        onChange={(e) => setAuthorFilter(e.target.value)}
        className="px-3 py-2 border rounded-lg"
      >
        <option value="">All Authors</option>
        {availableAuthors.map((author) => (
          <option key={author} value={author}>
            {author}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="px-3 py-2 border rounded-lg"
        value={dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
      />

      <input
        type="date"
        className="px-3 py-2 border rounded-lg"
        value={dateTo}
        onChange={(e) => setDateTo(e.target.value)}
      />
    </div>
  );
};
