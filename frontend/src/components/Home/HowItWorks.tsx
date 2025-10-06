import React from 'react';
import { Calendar, Tag, MapPin, Package } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Calendar,
      title: 'Schedule',
      description: 'Book your delivery in just 60 seconds with our smart scheduling system.',
      details: ['Auto-detect pickup location', 'Choose delivery time', 'Upload package photos'],
      color: 'blue'
    },
    {
      icon: Tag,
      title: 'Get Tracking ID',
      description: 'Receive your unique tracking ID with QR code for instant identification.',
      details: ['Unique tracking number', 'QR code generation', 'Share with recipient'],
      color: 'green'
    },
    {
      icon: MapPin,
      title: 'Track in Real-Time',
      description: 'Monitor your package journey with live GPS tracking and updates.',
      details: ['Live GPS tracking', 'Route visualization', 'ETA updates'],
      color: 'purple'
    },
    {
      icon: Package,
      title: 'Delivered!',
      description: 'Get notified when delivered with photo proof and recipient confirmation.',
      details: ['Delivery confirmation', 'Photo proof', 'Digital signature'],
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/20',
      text: 'text-blue-600',
      border: 'border-blue-200 dark:border-blue-700',
      gradient: 'from-blue-400 to-blue-600'
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900/20',
      text: 'text-green-600',
      border: 'border-green-200 dark:border-green-700',
      gradient: 'from-green-400 to-green-600'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/20',
      text: 'text-purple-600',
      border: 'border-purple-200 dark:border-purple-700',
      gradient: 'from-purple-400 to-purple-600'
    },
    orange: {
      bg: 'bg-orange-100 dark:bg-orange-900/20',
      text: 'text-orange-600',
      border: 'border-orange-200 dark:border-orange-700',
      gradient: 'from-orange-400 to-orange-600'
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How Swiftify Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From scheduling to delivery, our streamlined process makes shipping effortless. 
            Experience the simplicity of modern logistics.
          </p>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-green-400 via-purple-400 to-orange-400 transform -translate-y-1/2 z-0"></div>
            
            {/* Animated Truck */}
            <div className="absolute top-1/2 transform -translate-y-1/2 z-10">
              <div className="animate-truck-move text-4xl">🚛</div>
            </div>

            <div className="grid grid-cols-4 gap-8 relative z-20">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const colors = colorClasses[step.color as keyof typeof colorClasses];
                
                return (
                  <div key={step.title} className="text-center">
                    <div className={`w-20 h-20 mx-auto rounded-full ${colors.bg} ${colors.border} border-4 flex items-center justify-center mb-6 shadow-lg transform hover:scale-110 transition-transform bg-white dark:bg-gray-800`}>
                      <Icon className={`h-8 w-8 ${colors.text}`} />
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {index + 1}. {step.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {step.description}
                      </p>
                      <ul className="space-y-1">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.gradient} mr-2`}></div>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colors = colorClasses[step.color as keyof typeof colorClasses];
            
            return (
              <div key={step.title} className="flex items-start space-x-4">
                <div className={`w-16 h-16 rounded-full ${colors.bg} ${colors.border} border-4 flex items-center justify-center flex-shrink-0 shadow-lg bg-white dark:bg-gray-800`}>
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>
                
                <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {index + 1}. {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {step.description}
                  </p>
                  <ul className="space-y-1">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${colors.gradient} mr-2`}></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to experience the difference?</h3>
            <p className="text-lg mb-6 opacity-90">Join thousands of satisfied customers who trust Swiftify for their deliveries.</p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your First Delivery
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;