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
}

export interface NewsResponse {
  status: string;
  response: {
    docs: Article[];
  };
}
