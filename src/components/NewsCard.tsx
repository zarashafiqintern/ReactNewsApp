import { useNavigate } from 'react-router-dom'; 
import type { Article } from '../types/news';
import { encodeId } from '../utils';
import news from '../assets/news.webp';

interface NewsCardProps {
  article: Article;
}

export const NewsCard = ({ article }: NewsCardProps) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/news/${encodeId(article.id)}`, { state: { article } });
  };

  return (
    <div
      className="bg-white overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
      style={{
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      <div className="relative h-48 overflow-hidden shrink-0 group">
        <img
          src={article.thumbnail && article.thumbnail.trim() !== '' ? article.thumbnail : news}
          alt={article.title || 'No title'}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 bg-gray-100"
          onError={(e) => {
            e.currentTarget.src = news; 
          }}
        />
      </div>

      <div className="p-4 flex flex-col grow">
        <div className="mb-3 flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors pr-2">
            {article.title || 'No title'}
          </h2>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium text-xs whitespace-nowrap">
            {article.source || 'News'}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-gray-600 text-sm line-clamp-3">
            {article.description || 'No description available'}
          </p>
        </div>

        <div className="pt-3 mt-auto flex justify-end border-t">
          <button
            onClick={handleViewClick}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm md:text-base font-medium cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
