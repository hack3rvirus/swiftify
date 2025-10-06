import React from 'react';
import { Leaf, Truck, Zap, Recycle, TreePine, Award } from 'lucide-react';

const Sustainability: React.FC = () => {
  const initiatives = [
    {
      icon: Truck,
      title: 'Electric Fleet',
      description: '40% of our delivery vehicles are electric, with a goal of 100% by 2026.',
      stat: '40%',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: Zap,
      title: 'Route Optimization',
      description: 'AI-powered routing reduces travel distance by up to 30% per delivery.',
      stat: '30%',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: Recycle,
      title: 'Eco Packaging',
      description: 'Biodegradable packaging materials and reusable containers for regular customers.',
      stat: '100%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: TreePine,
      title: 'Carbon Offset',
      description: 'We plant a tree for every 10 deliveries completed through our platform.',
      stat: '50K+',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100 dark:bg-teal-900/20'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 dark:bg-green-900/20 rounded-full text-sm text-green-600 dark:text-green-400 mb-6">
            <Leaf className="h-4 w-4 mr-2" />
            <span>Sustainable Logistics</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Green Deliveries for a Better Tomorrow
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're committed to reducing our environmental impact while maintaining the speed 
            and reliability you expect. Every delivery counts towards a sustainable future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Content */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Environmental Commitment
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">1</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Carbon Neutral Operations</h4>
                  <p className="text-gray-600 dark:text-gray-400">All our facilities run on renewable energy, and we offset 100% of our delivery emissions.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">2</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Smart Consolidation</h4>
                  <p className="text-gray-600 dark:text-gray-400">We group nearby deliveries to minimize trips and reduce overall fuel consumption.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">3</span>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Waste Reduction</h4>
                  <p className="text-gray-600 dark:text-gray-400">Paperless operations and minimal packaging reduce waste by 70% compared to traditional logistics.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🌍</div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Environmental Impact</h4>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">CO₂ Reduced</span>
                  <span className="font-bold text-green-600">2,500 tons</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Trees Planted</span>
                  <span className="font-bold text-blue-600">50,000+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-gray-700 dark:text-gray-300">Renewable Energy</span>
                  <span className="font-bold text-purple-600">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {initiatives.map((initiative, index) => {
            const Icon = initiative.icon;
            
            return (
              <div 
                key={initiative.title}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className={`inline-flex p-3 rounded-lg ${initiative.bgColor} mb-4`}>
                  <Icon className={`h-6 w-6 ${initiative.color}`} />
                </div>
                
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {initiative.stat}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {initiative.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {initiative.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8">
            <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Certified Green Operations
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Recognized by leading environmental organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                <span className="text-green-600 dark:text-green-400 font-bold text-lg">B-Corp Certified</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Meeting highest standards of social and environmental performance</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                <span className="text-blue-600 dark:text-blue-400 font-bold text-lg">Carbon Neutral</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Verified carbon neutral operations since 2023</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 rounded-lg p-4 mb-4">
                <span className="text-purple-600 dark:text-purple-400 font-bold text-lg">ISO 14001</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Environmental management systems certification</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sustainability;