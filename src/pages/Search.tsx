
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/layout/Header';
import BottomNav from '../components/layout/BottomNav';
import SearchBar from '../components/SearchBar';
import CallCard, { CallData } from '../components/CallCard';

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<CallData[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock search function
  const performSearch = (searchQuery: string) => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock search results
      if (searchQuery.includes('555')) {
        setResults([
          {
            id: 'search-1',
            name: 'John Smith',
            number: '+1 (555) 123-4567',
            timestamp: new Date(),
            type: 'unknown',
            location: 'New York, NY'
          }
        ]);
      } else if (searchQuery.length >= 3) {
        setResults([
          {
            id: 'search-2',
            number: '+1 (800) 555-0199',
            timestamp: new Date(),
            type: 'unknown',
            location: 'Miami, FL'
          }
        ]);
      } else {
        setResults([]);
      }
      
      setLoading(false);
    }, 500);
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setSearchParams({ q: searchQuery });
    performSearch(searchQuery);
  };

  // Initial search based on URL params
  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, []);

  return (
    <>
      <Header showBackButton title="Search" />
      <main className="page-container">
        <div className="mb-6">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Enter phone number or name" 
          />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-6 text-muted-foreground">
            <div className="w-8 h-8 border-2 border-caller-blue border-t-transparent rounded-full animate-spin mb-3"></div>
            <p>Searching...</p>
          </div>
        ) : (
          <>
            {query && results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground animate-fade-in">
                <p>No results found for "{query}"</p>
                <p className="text-sm mt-2">Try searching for a phone number with area code</p>
              </div>
            ) : (
              <div className="space-y-2 animate-fade-in">
                {results.map((result) => (
                  <CallCard key={result.id} call={result} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      <BottomNav />
    </>
  );
};

export default Search;
