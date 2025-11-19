export interface Article {
  id: string;
  title: string; 
  description: string; 
  url: string; 
  publishedAt: string; 
  source: string; 
  thumbnail?: string; 
  author?: string | string[];
  category?: any; 
}

export interface NewsResponse {
  status: string;
  response: {
    docs: Article[];
  };
}

export interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: Array<{
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
  }>;
}
