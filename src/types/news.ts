export interface Article {
  _id: string;
  headline: {
    main: string;
  };
  abstract: string;
  web_url: string;
  pub_date: string;
  source: string;
  multimedia?: Array<{
    url: string;
  }>;
  byline?: string | string[];
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