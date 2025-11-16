import { NewsList } from './components/NewsList';
import { ArticleSearch } from './components/ArticleSearch';
import { WorldNews } from "./components/WorldNews";
import { useState } from 'react';

function App() {
  const [searchQuery, setSearchQuery] = useState("Technology");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">
            📰 News Aggregator
          </h1>
          <p className="text-gray-600 mt-1">
            Multiple news sources in one place
          </p>

          <div className="mt-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news from all sources..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        <NewsList searchQuery={searchQuery} />
        <ArticleSearch searchQuery={searchQuery} />
        <WorldNews searchQuery={searchQuery} />
      </main>
    </div>
  );
}

export default App;