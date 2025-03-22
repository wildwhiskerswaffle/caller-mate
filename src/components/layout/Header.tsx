
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  showSearch?: boolean;
  transparent?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBackButton = false, 
  showSearch = false,
  transparent = false
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll position to add blur effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine title based on route if not provided
  const getTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case '/':
        return 'Caller ID';
      case '/search':
        return 'Search';
      case '/settings':
        return 'Settings';
      default:
        if (location.pathname.startsWith('/call/')) {
          return 'Call Details';
        }
        return '';
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 flex items-center justify-between 
                 transition-all duration-300 h-16 ${scrolled || !transparent ? 
                 'bg-background/80 backdrop-blur-lg border-b border-border/50' : 
                 'bg-transparent'}`}
    >
      <div className="flex items-center gap-3">
        {showBackButton && (
          <button 
            onClick={() => navigate(-1)} 
            className="icon-button -ml-2"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-lg font-medium animate-fade-in">
          {getTitle()}
        </h1>
      </div>
      
      {showSearch && (
        <button 
          onClick={() => navigate('/search')} 
          className="icon-button"
          aria-label="Search"
        >
          <Search className="w-5 h-5" />
        </button>
      )}
    </header>
  );
};

export default Header;
