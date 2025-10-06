import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Clock, Award } from 'lucide-react';

const Stats: React.FC = () => {
  const [counters, setCounters] = useState({
    deliveries: 0,
    customers: 0,
    onTime: 0,
    rating: 0
  });

  const finalStats = {
    deliveries: 500000,
    customers: 100000,
    onTime: 99.5,
    rating: 4.9
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      if (currentStep <= steps) {
        const progress = currentStep / steps;
        setCounters({
          deliveries: Math.floor(finalStats.deliveries * progress),
          customers: Math.floor(finalStats.customers * progress),
          onTime: Math.floor(finalStats.onTime * progress * 100) / 100,
          rating: Math.floor(finalStats.rating * progress * 100) / 100
        });
        currentStep++;
      } else {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: TrendingUp,
      label: 'Parcels Delivered',
      value: counters.deliveries.toLocaleString() + '+',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      description: 'Successfully delivered packages'
    },
    {
      icon: Users,
      label: 'Happy Customers',
      value: counters.customers.toLocaleString() + '+',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      description: 'Satisfied customers worldwide'
    },
    {
      icon: Clock,
      label: 'On-Time Delivery',
      value: counters.onTime + '%',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      description: 'Packages delivered on schedule'
    },
    {
      icon: Award,
      label: 'Customer Rating',
      value: counters.rating + '/5',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      description: 'Average customer satisfaction'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Numbers don't lie. See why businesses and individuals choose Swiftify 
            for their logistics needs every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <div 
                key={stat.label}
                className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 text-center transform hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`inline-flex p-4 rounded-full ${stat.bgColor} mb-6`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {stat.label}
                </h3>
                
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {stat.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      stat.color.includes('blue') ? 'from-blue-400 to-blue-600' :
                      stat.color.includes('green') ? 'from-green-400 to-green-600' :
                      stat.color.includes('purple') ? 'from-purple-400 to-purple-600' :
                      'from-orange-400 to-orange-600'
                    } transition-all duration-2000 ease-out`}
                    style={{ 
                      width: stat.label === 'On-Time Delivery' ? '99.5%' : 
                             stat.label === 'Customer Rating' ? '98%' : '100%' 
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Metrics */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">15M+</div>
            <div className="text-blue-100">Miles Driven</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">2.5K</div>
            <div className="text-green-100">CO₂ Tons Saved</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl font-bold mb-2">&lt;24hrs</div>
            <div className="text-purple-100">Avg Delivery Time</div>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="mt-16 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Live Activity Feed
          </h3>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {[
              { action: 'Package delivered', location: 'San Francisco, CA', time: '2 min ago', type: 'success' },
              { action: 'New pickup scheduled', location: 'Los Angeles, CA', time: '5 min ago', type: 'info' },
              { action: 'Package in transit', location: 'Phoenix, AZ', time: '8 min ago', type: 'warning' },
              { action: 'Delivery completed', location: 'Seattle, WA', time: '12 min ago', type: 'success' },
              { action: 'Package picked up', location: 'Denver, CO', time: '15 min ago', type: 'info' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'success' ? 'bg-green-400' :
                    activity.type === 'info' ? 'bg-blue-400' : 'bg-yellow-400'
                  }`}></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.action}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.location}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;