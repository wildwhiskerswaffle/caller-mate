
import React from 'react';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import RecentCalls from '../components/RecentCalls';
import SearchBar from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };
  
  return (
    <>
      <Header title="Caller ID" showSearch transparent />
      <main className="page-container">
        <div className="mb-4 mt-2">
          <SearchBar onSearch={handleSearch} />
        </div>
        <RecentCalls />
      </main>
      <BottomNav />
    </>
  );
};

export default Index;
