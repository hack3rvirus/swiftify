import React from 'react';
import { Smartphone, Download, Bell, MapPin, Camera, Zap } from 'lucide-react';

const AppTeaser: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Real-Time Tracking',
      description: 'Track your packages on the go with live GPS updates'
    },
    {
      icon: Bell,
      title: 'Push Notifications',
      description: 'Get instant alerts for pickup, transit, and delivery updates'
    },
    {
      icon: Camera,
      title: 'Photo Capture',
      description: 'Take photos of packages and delivery confirmations'
    },
    {
      icon: Zap,
      title: 'Quick Actions',
      description: 'Schedule deliveries and track packages with one tap'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-white/20 rounded-full text-sm mb-6">
              <Smartphone className="h-4 w-4 mr-2" />
              <span>Coming Soon</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Track on the Go with Our Mobile App
            </h2>
            
            <p className="text-xl mb-8 opacity-90">
              Experience the full power of Swiftify logistics in your pocket. 
              Schedule deliveries, track packages, and manage your shipments 
              anywhere, anytime.
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 bg-white/20 rounded-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm opacity-80">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex items-center justify-center space-x-3 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                <div className="text-2xl">📱</div>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </button>
              
              <button className="flex items-center justify-center space-x-3 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold transition-colors">
                <div className="text-2xl">🤖</div>
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </button>
            </div>

            {/* Early Access */}
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold mb-3">🚀 Get Early Access</h3>
              <p className="text-sm opacity-90 mb-4">
                Be the first to experience our mobile app. Join the beta program 
                and help shape the future of logistics.
              </p>
              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Beta
                </button>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative">
            <div className="relative mx-auto w-80 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
              {/* Phone Screen */}
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl overflow-hidden relative">
                {/* Status Bar */}
                <div className="flex justify-between items-center px-6 py-3 bg-white/90">
                  <span className="text-xs font-semibold text-gray-900">9:41 AM</span>
                  <div className="flex space-x-1">
                    <div className="w-4 h-2 bg-green-500 rounded-sm"></div>
                    <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                    <div className="w-4 h-2 bg-gray-300 rounded-sm"></div>
                  </div>
                </div>
                
                {/* App Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Swiftify</h3>
                      <p className="text-xs text-gray-600">Track your packages</p>
                    </div>
                  </div>
                  
                  {/* Tracking Card */}
                  <div className="bg-white rounded-xl shadow-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-medium text-gray-500">SWIFT-123456</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">In Transit</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <p className="text-xs text-gray-600">San Jose, CA → Los Angeles, CA</p>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="bg-blue-600 text-white p-3 rounded-xl text-xs font-semibold">
                      Schedule
                    </button>
                    <button className="bg-gray-100 text-gray-900 p-3 rounded-xl text-xs font-semibold">
                      Track
                    </button>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute top-20 right-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                  <MapPin className="h-4 w-4 text-white" />
                </div>
                
                <div className="absolute bottom-20 left-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                  <Bell className="h-3 w-3 text-white" />
                </div>
              </div>
              
              {/* Phone Details */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-700 rounded-full"></div>
            </div>
            
            {/* Floating Icons */}
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-float">
              <Download className="h-6 w-6" />
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-float-delayed">
              <Smartphone className="h-8 w-8" />
            </div>
            
            <div className="absolute top-1/2 -right-8 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Zap className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">500K+</div>
            <div className="text-sm opacity-80">App Downloads Expected</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">4.9★</div>
            <div className="text-sm opacity-80">Projected Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-sm opacity-80">Mobile Support</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">iOS & Android</div>
            <div className="text-sm opacity-80">Cross-Platform</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppTeaser;