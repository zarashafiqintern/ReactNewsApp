import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '../services/newsApi';
import { NewsCard } from './NewsCard';
import { useState } from 'react';

export const NewsList = () => {
  const [searchQuery, setSearchQuery] = useState("Politics");

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['news', searchQuery],
    queryFn: () => fetchNews(searchQuery),
  });

  const articles = data?.response.docs || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch(); 
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search news..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          Failed to load news. Please try again.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Latest News ({articles.length} articles)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>
        </>
      )}

      {!isLoading && !error && articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No articles found</p>
        </div>
      )}
    </div>
  );
};
