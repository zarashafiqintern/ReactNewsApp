import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { fetchNews } from "./services/newsApi";
import { fetchGuardianNews } from "./services/guardianApi";
import { fetchWorldNews } from "./services/worldnewsApi";
import { NewsCard } from "./components/NewsCard";
import { useShuffledArticles } from "./hooks/useShuffledArticles";
import { Filters} from "./components/Filters";

function App() {
  const [searchQuery, setSearchQuery] = useState("Politics");

  const [sourceFilter, setSourceFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const { data: newsData, isLoading: newsLoading } = useQuery({
    queryKey: ["news", searchQuery],
    queryFn: () => fetchNews(searchQuery),
  });

  const { data: guardianData, isLoading: guardianLoading } = useQuery({
    queryKey: ["guardian-news", searchQuery],
    queryFn: () => fetchGuardianNews(searchQuery),
  });

  const { data: worldNewsData, isLoading: worldNewsLoading } = useQuery({
    queryKey: ["world-news", searchQuery],
    queryFn: () => fetchWorldNews(searchQuery),
  });

  const shuffledArticles = useShuffledArticles(newsData, guardianData, worldNewsData);

  const isLoading = newsLoading || guardianLoading || worldNewsLoading;

  const filteredArticles = useMemo(() => {
    return shuffledArticles.filter((article) => {

      if (sourceFilter !== "all") {
        if (sourceFilter === "newsapi" && !article._id.includes("newsapi")) return false;
        if (sourceFilter === "guardian" && article.source !== "The Guardian") return false;
        if (
          sourceFilter === "worldnews" &&
          (article.source === "The Guardian" || article._id.includes("newsapi"))
        )
          return false;
      }

      const articleDate = new Date(article.pub_date);
      if (dateFrom && articleDate < new Date(dateFrom)) return false;
      if (dateTo && articleDate > new Date(dateTo)) return false;

      return true;
    });
  }, [shuffledArticles, sourceFilter, dateFrom, dateTo]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm z-10 ">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">📰 News Aggregator</h1>
          <p className="text-gray-600 mt-1">Multiple news sources in one place</p>

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
        </div>

        <Filters
          sourceFilter={sourceFilter}
          setSourceFilter={setSourceFilter}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
        />
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {isLoading && filteredArticles.length === 0 && (
          <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Loading news from all sources...</p>
          </div>
        )}

        {filteredArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <NewsCard key={article._id} article={article} />
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

export default App;
