
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search phone number or name'
}) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="relative w-full animate-slide-down"
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-3 pl-10 pr-10 bg-caller-gray-100 dark:bg-caller-gray-800 
                    rounded-xl text-foreground placeholder:text-muted-foreground
                    focus:outline-none focus:ring-1 focus:ring-caller-blue"
          aria-label="Search"
        />
        {query && (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute inset-y-0 right-3 flex items-center"
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
