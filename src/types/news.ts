export interface Article {
  id: string;
  title: string; 
  description: string; 
  url: string; 
  publishedAt: string; 
  source: string; 
  thumbnail?: string; 
  author?: string[];
  category?: string; 
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

export interface WorldNewsAPIResponse {
status: string;
results: Array<{
article_id: string;
title: string;
description?: string;
content?: string;
link: string;
pubDate: string;
source_id?: string;
image_url?: string;
creator?: string[];
}>;
}

export interface GuardianArticle {
  id: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  fields?: {
    trailText?: string;
    thumbnail?: string;
    author?: string[];
  };
}

export interface GuardianAPIResponse {
  response: {
    status: string;
    results: GuardianArticle[];
  };
}
