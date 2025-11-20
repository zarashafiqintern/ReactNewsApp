import { useQueries } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { fetchNews } from "../services/newsApi";
import { fetchGuardianNews } from "../services/guardianApi";
import { fetchWorldNews } from "../services/worldnewsApi";
import { NewsCard } from "../components/NewsCard";
import { useShuffledArticles } from "../hooks/useShuffledArticles";
import { Filters } from "../components/Filters";

const NEWS_SOURCES = [
  { key: "news", queryKey: ["news"], fetchFn: fetchNews },
  { key: "guardian", queryKey: ["guardian-news"], fetchFn: fetchGuardianNews },
  { key: "worldNews", queryKey: ["world-news"], fetchFn: fetchWorldNews },
];

function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("Politics");
  const [sourceFilter, setSourceFilter] = useState("null");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");

  const results = useQueries({
    queries: NEWS_SOURCES.map(source => ({
      queryKey: [...source.queryKey, searchQuery],
      queryFn: () => source.fetchFn(searchQuery),
    }))
  });

  const [newsData, guardianData, worldNewsData] = results.map(result => result.data);
  const isLoading = results.some(result => result.isLoading);

  const shuffledArticles = useShuffledArticles(
    newsData,
    guardianData,
    worldNewsData
  );

  const filteredArticles = useMemo(() => {
    return shuffledArticles.filter((article) => {
      if (sourceFilter !== "all") {
        if (sourceFilter === "newsapi" && !article.id.includes("newsapi"))
          return false;
        if (sourceFilter === "guardian" && article.source !== "The Guardian")
          return false;
        if (
          sourceFilter === "worldnews" &&
          (article.source === "The Guardian" ||
            article.id.includes("newsapi"))
        )
          return false;
      }

      const articleDate = new Date(article.publishedAt);
      if (dateFrom && articleDate < new Date(dateFrom)) return false;
      if (dateTo && articleDate > new Date(dateTo)) return false;

      const Author = article.author || "";
      const articleAuthor = Array.isArray(Author)
        ? Author.join(", ").trim()
        : Author.trim();

      if (authorFilter && articleAuthor !== authorFilter) return false;

      return true;
    });
  }, [shuffledArticles, sourceFilter, dateFrom, dateTo, authorFilter]);

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
          authorFilter={authorFilter}
          setAuthorFilter={setAuthorFilter}
          shuffledArticles={shuffledArticles}
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