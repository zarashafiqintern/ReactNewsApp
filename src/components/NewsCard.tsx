import type { Article } from '../types/news';

interface NewsCardProps {
  article: Article;
}

export const NewsCard = ({ article }: NewsCardProps) => {

const imageUrl = article.multimedia?.[0]?.url || 'https://via.placeholder.com/400x200?text=No+Image';

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
        <p className="text-gray-600 text-sm mb-3">
          {article.abstract || 'No description available'}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {new Date(article.pub_date).toLocaleDateString()}
          </span>
          <a
            href={article.web_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
  );
};
