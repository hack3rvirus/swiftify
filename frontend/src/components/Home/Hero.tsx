import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Package, Zap, MapPin, Play } from 'lucide-react';

const Hero: React.FC = () => {
  const [quickQuote, setQuickQuote] = useState({
    weight: '',
    from: '',
    to: ''
  });

  const handleQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo calculation
    const estimate = Math.floor(Math.random() * 50) + 15;
    alert(`Estimated cost: $${estimate} - Delivery in 1-2 business days`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&h=800&fit=crop')`,
            backgroundPosition: 'top left'
          }}
        ></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&h=800&fit=crop')`,
            backgroundPosition: 'top right'
          }}
        ></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop')`,
            backgroundPosition: 'bottom center'
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-left">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/20 rounded-full text-sm text-blue-600 dark:text-blue-400 mb-6">
              <Zap className="h-4 w-4 mr-2" />
              <span>Now with Real-Time AI Tracking</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Speed Meets
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {' '}Intelligence
              </span>
              <br />
              in Every Delivery
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              Experience the future of logistics with real-time tracking, AI-powered routes, 
              and seamless delivery management. From pickup to doorstep, we've got you covered.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                to="/schedule"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Package className="h-5 w-5" />
                <span>Schedule Delivery</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/track"
                className="border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 text-gray-900 dark:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-center space-x-2"
              >
                <MapPin className="h-5 w-5" />
                <span>Track Package</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>99.5% On-Time Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>500K+ Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Quick Quote Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Get Instant Quote
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Quick estimate for your delivery needs
              </p>
            </div>

            <form onSubmit={handleQuickQuote} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Package Weight
                </label>
                <select
                  value={quickQuote.weight}
                  onChange={(e) => setQuickQuote({ ...quickQuote, weight: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                >
                  <option value="">Select weight</option>
                  <option value="<1kg">Under 1kg</option>
                  <option value="1-5kg">1-5kg</option>
                  <option value="5-10kg">5-10kg</option>
                  <option value="10kg+">Over 10kg</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  From (ZIP Code)
                </label>
                <input
                  type="text"
                  value={quickQuote.from}
                  onChange={(e) => setQuickQuote({ ...quickQuote, from: e.target.value })}
                  placeholder="e.g., 90210"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  To (ZIP Code)
                </label>
                <input
                  type="text"
                  value={quickQuote.to}
                  onChange={(e) => setQuickQuote({ ...quickQuote, to: e.target.value })}
                  placeholder="e.g., 10001"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                Get Instant Quote
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center space-x-4">
                <span>🚚 Same-day delivery available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;