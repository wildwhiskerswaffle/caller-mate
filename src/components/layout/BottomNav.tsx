
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Phone, Search, Settings, Shield } from 'lucide-react';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      label: 'Calls',
      icon: <Phone className="w-5 h-5" />,
      path: '/',
    },
    {
      label: 'Search',
      icon: <Search className="w-5 h-5" />,
      path: '/search',
    },
    {
      label: 'Block',
      icon: <Shield className="w-5 h-5" />,
      path: '/block',
    },
    {
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />,
      path: '/settings',
    },
  ];
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border/50 animate-slide-up">
      <div className="max-w-md mx-auto flex items-center justify-around px-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            aria-label={item.label}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
