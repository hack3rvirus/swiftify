import React, { useState, useEffect } from 'react';
import { MapPin, Search } from 'lucide-react';
import MapContainer from '../Maps/MapContainer';

const CoverageMap: React.FC = () => {
  const [zipCode, setZipCode] = useState('');
  const [isServiceable, setIsServiceable] = useState<boolean | null>(null);
  
  const serviceCities = [
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194, population: '875K' },
    { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, population: '3.9M' },
    { name: 'New York', lat: 40.7128, lng: -74.0060, population: '8.3M' },
    { name: 'Chicago', lat: 41.8781, lng: -87.6298, population: '2.7M' },
    { name: 'Houston', lat: 29.7604, lng: -95.3698, population: '2.3M' },
    { name: 'Phoenix', lat: 33.4484, lng: -112.0740, population: '1.6M' },
    { name: 'Miami', lat: 25.7617, lng: -80.1918, population: '470K' },
    { name: 'Seattle', lat: 47.6062, lng: -122.3321, population: '750K' },
    { name: 'Boston', lat: 42.3601, lng: -71.0589, population: '685K' },
    { name: 'Atlanta', lat: 33.7490, lng: -84.3880, population: '500K' }
  ];

  const checkServiceability = (zip: string) => {
    // Demo logic - in real app, this would call an API
    const serviceable = Math.random() > 0.3; // 70% chance of being serviceable
    setIsServiceable(serviceable);
  };

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.trim()) {
      checkServiceability(zipCode);
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nationwide Coverage
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Serving 50+ major cities across the United States with expanding coverage daily
          </p>
          
          {/* ZIP Code Checker */}
          <div className="max-w-md mx-auto">
            <form onSubmit={handleZipCheck} className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter ZIP code"
                  className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
              >
                <Search className="h-4 w-4" />
                <span className="hidden sm:inline">Check</span>
              </button>
            </form>
            
            {isServiceable !== null && (
              <div className={`mt-4 p-4 rounded-lg ${
                isServiceable 
                  ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300' 
                  : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
              }`}>
                {isServiceable 
                  ? '🎉 Great news! We deliver to your area.' 
                  : '📍 We\'re expanding to your area soon. Join our waitlist!'}
              </div>
            )}
          </div>
        </div>

        {/* Interactive Map Visualization */}
        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 overflow-hidden">
          <MapContainer
            center={{ lat: 39.8283, lng: -98.5795 }}
            zoom={4}
            markers={serviceCities.map(city => ({
              position: { lat: city.lat, lng: city.lng },
              title: `${city.name} (${city.population})`,
              color: '#007BFF'
            }))}
            className="h-96 rounded-xl"
            showControls={false}
          />

          {/* Coverage Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Delivery Hubs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Delivery Vehicles</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Operations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageMap;