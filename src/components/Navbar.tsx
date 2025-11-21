import { Filter, Search } from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const Navbar = () => {
  const { searchQuery, setSearchQuery, handleSearch, showFilters, setShowFilters } = useNews();

  return (
    <header className="bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="shrink-0">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 whitespace-nowrap">
              📰 News Aggregator
            </h1>
          </div>

          <div className="flex gap-2 flex-1 min-w-0 justify-end">
            <form onSubmit={handleSearch} className="w-full max-w-xs">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  className="w-full pl-4 pr-10 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
              </div>
            </form>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="shrink-0 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-auto md:px-5 md:py-2.5 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors"
              title="Filters"
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden md:inline ml-2 text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
