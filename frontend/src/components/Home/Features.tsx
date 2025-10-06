import React from 'react';
import { MapPin, Clock, Shield, Leaf, Globe, QrCode as BarCode3, Camera, MessageCircle, Zap, Smartphone, Route, Bell } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Auto-Location Detection',
      description: 'Automatically detect sender location using GPS for faster scheduling.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: Clock,
      title: 'Real-Time Tracking',
      description: 'Monitor your package journey with live updates and precise ETA.',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: Shield,
      title: 'Secure & Insured',
      description: 'End-to-end security with comprehensive insurance coverage.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: Route,
      title: 'AI-Optimized Routes',
      description: 'Smart routing algorithms ensure fastest delivery times.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Extensive coverage across 50+ cities with 24/7 operations.',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20'
    },
    {
      icon: BarCode3,
      title: 'Smart Tracking IDs',
      description: 'Unique QR codes and barcodes for instant package identification.',
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    },
    {
      icon: Camera,
      title: 'Photo Documentation',
      description: 'Upload and track photos for proof of condition and delivery.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100 dark:bg-teal-900/20'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Multi-channel alerts via email, SMS, and push notifications.',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100 dark:bg-pink-900/20'
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly Delivery',
      description: 'Carbon-neutral shipping with electric vehicles and optimized routes.',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Schedule deliveries in under 60 seconds with our streamlined process.',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Full-featured mobile experience for tracking on the go.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: MessageCircle,
      title: '24/7 Support',
      description: 'Round-the-clock customer support with live chat assistance.',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100 dark:bg-gray-700'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Swiftify?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience next-generation logistics with features designed for modern businesses 
            and individuals who demand reliability, speed, and transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-3 rounded-lg ${feature.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="h-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10K+</div>
            <div className="text-gray-700 dark:text-gray-300">Daily Deliveries</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">99.8%</div>
            <div className="text-gray-700 dark:text-gray-300">Success Rate</div>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">&lt;2hrs</div>
            <div className="text-gray-700 dark:text-gray-300">Avg Pickup Time</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;