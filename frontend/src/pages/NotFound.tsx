import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Home, Search, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Animated Package */}
        <div className="relative mb-8">
          <div className="text-8xl mb-4 animate-bounce">📦</div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="text-2xl animate-pulse">❓</div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
            404
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Package Not Found
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Oops! Looks like this package got lost in transit.
          </p>
          <p className="text-gray-500 dark:text-gray-500">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Looking for a specific package?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Try tracking your package with its ID instead
          </p>
          
          <div className="flex space-x-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Enter tracking ID (e.g., SWIFT-123456)"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button
              onClick={() => navigate('/track')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Search className="h-4 w-4" />
              <span>Track</span>
            </button>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/')}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors group"
          >
            <Home className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Go Home</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Return to homepage</p>
          </button>
          
          <button
            onClick={() => navigate('/track')}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors group"
          >
            <Package className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Track Package</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Find your delivery</p>
          </button>
          
          <button
            onClick={() => navigate('/schedule')}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 transition-colors group"
          >
            <ArrowLeft className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Schedule Delivery</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Send a new package</p>
          </button>
        </div>

        {/* Fun Facts */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">📊 Did you know?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-2xl font-bold">99.5%</div>
              <div className="opacity-90">of our packages arrive on time</div>
            </div>
            <div>
              <div className="text-2xl font-bold">500K+</div>
              <div className="opacity-90">packages delivered successfully</div>
            </div>
            <div>
              <div className="text-2xl font-bold">24/7</div>
              <div className="opacity-90">customer support available</div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center space-x-2 mx-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go back to previous page</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;