import { useQuery } from '@tanstack/react-query';
import { useState, useMemo } from 'react';
import { fetchNews } from './services/newsApi';
import { fetchGuardianNews } from './services/guardianApi';
import { fetchWorldNews } from './services/worldnewsApi';
import { NewsCard } from './components/NewsCard';
import type { Article } from './types/news';

function App() {
  const [searchQuery, setSearchQuery] = useState("Politics");

  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ['news', searchQuery],
    queryFn: () => fetchNews(searchQuery),
    retry: 1,
  });

  const { data: guardianData, isLoading: guardianLoading } = useQuery({
    queryKey: ['guardian-news', searchQuery],
    queryFn: () => fetchGuardianNews(searchQuery),
    retry: 1,
  });

  const { data: worldNewsData, isLoading: worldNewsLoading } = useQuery({
    queryKey: ['world-news', searchQuery],
    queryFn: () => fetchWorldNews(searchQuery),
    retry: 1,
  });

  const shuffledArticles = useMemo(() => {
    const combined: Article[] = [];

    if (newsData?.response?.docs) {
      combined.push(...newsData.response.docs);
    }

    if (guardianData?.response?.docs) {
      combined.push(...guardianData.response.docs);
    }

    if (worldNewsData?.response?.docs) {
      combined.push(...worldNewsData.response.docs);
    }

    const shuffled = [...combined];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  }, [newsData, guardianData, worldNewsData]);

  const isLoading = newsLoading || guardianLoading || worldNewsLoading;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            📰 News Aggregator
          </h1>
          <p className="text-gray-600 mt-1">
            Multiple news sources in one place
          </p>

          <form onSubmit={handleSearch} className="mt-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news from all sources..."
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
            <div className="mt-4 flex gap-2 items-center text-sm text-gray-600">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Loading from {newsLoading ? 'NewsAPI, ' : ''}{guardianLoading ? 'Guardian, ' : ''}{worldNewsLoading ? 'World News' : ''}</span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading && shuffledArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading news from all sources...</p>
          </div>
        )}

        {shuffledArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shuffledArticles.map((article) => (
              <NewsCard key={article._id} article={article} />
            ))}
          </div>
        )}

        {!isLoading && shuffledArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <p className="text-gray-600 text-lg">No articles found for "{searchQuery}"</p>
            <p className="text-gray-500 text-sm mt-2">Try searching for something else</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
