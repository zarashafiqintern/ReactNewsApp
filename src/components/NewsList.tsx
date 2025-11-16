import { useQuery } from '@tanstack/react-query';
import { fetchNews } from '../services/newsApi';
import { NewsCard } from './NewsCard';

interface NewsListProps {
  searchQuery: string;
}

export const NewsList = ({ searchQuery }: NewsListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['news', searchQuery],
    queryFn: () => fetchNews(searchQuery),
  });

  const articles = data?.response.docs || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📰 NewsAPI Results
      </h2>

      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          Failed to load news.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <p className="text-gray-600 mb-4">Found {articles.length} articles</p>
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
