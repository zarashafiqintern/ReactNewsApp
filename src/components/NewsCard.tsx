import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/news';
import { PLACEHOLDER_IMAGE_SMALL } from '../constants/images';

interface NewsCardProps {
  article: Article;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  const navigate = useNavigate();
  const imageUrl = article.thumbnail || PLACEHOLDER_IMAGE_SMALL;

  const handleViewClick = () => {
    navigate(`/news/${encodeURIComponent(article.id)}`, {
      state: { article }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden shrink-0">
        <img
          src={imageUrl}
          alt={article.title || 'No title'}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = PLACEHOLDER_IMAGE_SMALL;
          }}
        />
      </div>

      <div className="p-4 flex flex-col grow">
        <div className="mb-3">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors">
            {article.title || 'No title'}
          </h2>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-3">
            {article.description || 'No description available'}
          </p>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            📅 {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
            {article.source || 'News'}
          </span>
        </div>

        <div className="pt-3 border-t mt-auto">
          <button
            onClick={handleViewClick}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
};
