import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NewsProvider } from './context/NewsContext';
import NewsPage from './pages/NewsPage';
import NewsDetailPage from './pages/NewsDetailPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NewsProvider>
        <Routes>
          <Route path="/" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetailPage />} />
        </Routes>
      </NewsProvider>
    </QueryClientProvider>
  );
}

export default App;
