import { useNews } from '../context/NewsContext';
import type { SourceFilterType } from '../types/news';

export const Filters = () => {
  const {
    filters,
    setSourceFilter,
    setDateFrom,
    setDateTo,
    setAuthorFilter,
    clearFilters,
    hasActiveFilters,
    availableAuthors,
  } = useNews();

  return (
    <div className="bg-white p-4 flex flex-wrap items-center gap-4 z-20">
      <select
        value={filters.sourceFilter}
        onChange={(e) => setSourceFilter(e.target.value as SourceFilterType)}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Sources</option>
        <option value="newsapi">News API</option>
        <option value="guardian">The Guardian</option>
        <option value="worldnews">World News</option>
      </select>

      <select
        value={filters.authorFilter}
        onChange={(e) => setAuthorFilter(e.target.value)}
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.dateFrom}
        onChange={(e) => setDateFrom(e.target.value)}
      />

      <input
        type="date"
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filters.dateTo}
        onChange={(e) => setDateTo(e.target.value)}
      />

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
        >
          <span>✕</span>
          Clear Filters
        </button>
      )}
    </div>
  );
};
