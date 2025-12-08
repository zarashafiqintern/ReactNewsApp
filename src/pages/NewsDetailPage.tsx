import { useLocation, useNavigate } from "react-router-dom";
import { Calendar, User, ExternalLink } from "lucide-react";
import type { Article } from "../types/news";
import { formatDate, getAuthorText, openInNewTab } from "../utils";
import news from "../assets/news.webp";
import NotFound from "../components/NotFound";
import { Navbar } from "../components/Navbar";

const NewsDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article as Article;
  const imageUrl = article.thumbnail || news;
  const authorText = getAuthorText(article.author);

  if (!article) return <NotFound />;

  return (
    <>
      <Navbar hideInputs />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="w-full h-96 overflow-hidden bg-gray-200">
            <img
              src={imageUrl}
              alt={article.title || "No title"}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = news;
              }}
            />
          </div>

          <div className="p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                {article.source || "News Source"}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title || "No title"}
            </h1>

            <div className="flex flex-wrap items-center gap-6 mb-6 text-sm text-gray-600 border-b pb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>

              {authorText && (
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-gray-600" />
                  <span>{authorText}</span>
                </div>
              )}
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-700 leading-relaxed">
                {article.description || "-"}
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={() => openInNewTab(article.url)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
              >
                Read Article on {article.source || "Original Site"}
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>
        </article>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
          >
            Back to All News
          </button>
        </div>
      </main>
    </>
  );
};

export default NewsDetailPage;
