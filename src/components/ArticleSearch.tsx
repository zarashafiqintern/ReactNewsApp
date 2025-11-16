import { useQuery } from '@tanstack/react-query';
import { fetchGuardianNews } from '../services/guardianApi';
import { NewsCard } from './NewsCard';

interface ArticleSearchProps {
  searchQuery: string;
}

export const ArticleSearch = ({ searchQuery }: ArticleSearchProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['guardian-news', searchQuery],
    queryFn: () => fetchGuardianNews(searchQuery),
  });

  const articles = data?.response?.results || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 border-t-2 border-gray-200 mt-8 pt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        🗞️ The Guardian Results
      </h2>

      {isLoading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600">Loading Guardian articles...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          Failed to load Guardian articles.
        </div>
      )}

      {!isLoading && !error && (
        <>
          <p className="text-gray-600 mb-4">Found {articles.length} articles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article: any) => (
              <NewsCard 
                key={article.id} 
                article={{
                  _id: article.id,
                  headline: { main: article.webTitle },
                  abstract: article.fields?.trailText || 'No description available',
                  web_url: article.webUrl,
                  pub_date: article.webPublicationDate,
                  source: 'The Guardian',
                  multimedia: article.fields?.thumbnail 
                    ? [{ url: article.fields.thumbnail }]
                    : undefined
                }}
              />
            ))}
          </div>
        </>
      )}

      {!isLoading && !error && articles.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No Guardian articles found</p>
        </div>
      )}
    </div>
  );
};