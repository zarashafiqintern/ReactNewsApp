import { useNavigate } from 'react-router-dom';
import type { Article } from '../types/news';

interface NewsCardProps {
  article: Article;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  const navigate = useNavigate();
  const imageUrl = article.multimedia?.[0]?.url || 'https://via.placeholder.com/400x200?text=No+Image';

  const handleViewClick = () => {
    navigate(`/news/${encodeURIComponent(article._id)}`, {
      state: { article }
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
      <img 
        src={imageUrl} 
        alt={article.headline.main}
        className="w-full h-48 object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=No+Image';
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 text-gray-800">
          {article.headline.main}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">
          {article.abstract || 'No description available'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {new Date(article.pub_date).toLocaleDateString()}
          </span>
          <span className="text-xs text-blue-600 font-semibold">
            {article.source || 'News'}
          </span>
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleViewClick}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
