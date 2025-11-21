import { X } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { NewsCard } from '../components/NewsCard';
import { Filters } from '../components/Filters';
import { Navbar } from '../components/Navbar';

function NewsPage() {
  const { showFilters, setShowFilters, isLoading, filteredArticles } = useNews();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {showFilters && (
        <div className="max-w-7xl mx-auto px-4 py-3 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 text-sm tracking-wide">Filters</h3>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="space-y-3">
            <Filters />
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6">
        {isLoading && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading news from all sources...</p>
          </div>
        )}

        {filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {!isLoading && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <p className="text-gray-600 text-lg">No articles match your filters</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default NewsPage;
