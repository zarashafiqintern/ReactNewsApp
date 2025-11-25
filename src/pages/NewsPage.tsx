import { useNews } from '../context/NewsContext';
import { NewsCard } from '../components/NewsCard';
import { Filters } from '../components/Filters';
import { Navbar } from '../components/Navbar';
import { Pagination } from '../components/Pagination';

function NewsPage() {
  const { 
    showFilters, 
    isLoading, 
    paginatedArticles,
    totalPages,
    currentPage,
    setCurrentPage
  } = useNews();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {showFilters && (
          <Filters />
       )}

      <main className="max-w-7xl mx-auto px-4 py-6">
        {isLoading && paginatedArticles.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading news from all sources...</p>
          </div>
        )}

        {paginatedArticles.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedArticles.map((article) => (
                <NewsCard key={article.id} article={article} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {!isLoading && paginatedArticles.length === 0 && (
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
