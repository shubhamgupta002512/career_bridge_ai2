import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/70 backdrop-blur-lg shadow-lg border-b border-white/40 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Briefcase className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">CareerBridge AI</span>
            </Link>
            <div className="hidden md:flex ml-10 space-x-4 items-center">
              <Link to="/jobs" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Private Jobs</Link>
              <Link to="/government-jobs" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Gov Exams</Link>
              <Link to="/companies" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Companies</Link>
              <Link to="/job-matcher" className="text-green-600 hover:text-green-700 font-bold px-3 py-2 text-sm">Smart Matcher</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Dashboard</Link>
                <button
                  onClick={logout}
                  className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium">Log in</Link>
                <Link
                  to="/register"
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
