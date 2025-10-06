import React, { useState, useEffect } from 'react';
import { Search, X, Clock, Zap } from 'lucide-react';
import { useTracking } from '../../contexts/TrackingContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (trackingId: string) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [trackingId, setTrackingId] = useState('');
  const { searchHistory } = useTracking();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      onSearch(trackingId.trim());
    }
  };

  const handleHistoryClick = (id: string) => {
    setTrackingId(id);
    onSearch(id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-lg w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Track</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="relative">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter tracking ID (e.g., SWIFT-123456)"
              className="w-full px-4 py-3 pl-10 pr-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              autoFocus
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <Zap className="h-4 w-4" />
            <span>Track Now</span>
          </button>
        </form>

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="px-6 pb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Recent Searches</span>
            </h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {searchHistory.map((id, index) => (
                <button
                  key={index}
                  onClick={() => handleHistoryClick(id)}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white text-sm transition-colors"
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Demo IDs */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Try Demo Tracking IDs:
          </h3>
          <div className="space-y-2">
            {['SWIFT-123456', 'SWIFT-789012', 'SWIFT-345678'].map((id) => (
              <button
                key={id}
                onClick={() => handleHistoryClick(id)}
                className="inline-block mr-2 mb-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white text-sm rounded-full transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;