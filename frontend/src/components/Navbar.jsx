import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Store, LayoutDashboard } from 'lucide-react';

const Navbar = ({ totalProducts }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-4 w-full justify-center sm:justify-start">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                currentPath === '/'
                  ? 'bg-brand-50 text-brand-700 border border-brand-200 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>Store Front</span>
            </Link>

            <Link
              to="/admin"
              className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                currentPath === '/admin'
                  ? 'bg-brand-50 text-brand-700 border border-brand-200 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Dashboard</span>
              <span className="ml-1 bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                {totalProducts}
              </span>
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
