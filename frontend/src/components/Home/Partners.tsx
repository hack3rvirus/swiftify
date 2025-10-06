import React from 'react';
import { Award, Shield, CreditCard, Smartphone, Zap, Globe } from 'lucide-react';

const Partners: React.FC = () => {
  const partners = [
    {
      name: 'Stripe',
      logo: CreditCard,
      description: 'Secure payment processing',
      category: 'Payment'
    },
    {
      name: 'Google Maps',
      logo: Globe,
      description: 'Advanced routing & tracking',
      category: 'Maps'
    },
    {
      name: 'Twilio',
      logo: Smartphone,
      description: 'SMS & communication APIs',
      category: 'Communication'
    },
    {
      name: 'AWS',
      logo: Shield,
      description: 'Cloud infrastructure',
      category: 'Cloud'
    },
    {
      name: 'Shopify',
      logo: Zap,
      description: 'E-commerce integration',
      category: 'E-commerce'
    },
    {
      name: 'ISO Certified',
      logo: Award,
      description: 'Quality assurance',
      category: 'Certification'
    }
  ];

  const integrations = [
    'Shopify', 'WooCommerce', 'BigCommerce', 'Magento', 'Amazon FBA', 'eBay',
    'Etsy', 'Square', 'PayPal', 'FedEx', 'UPS', 'DHL'
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Trusted Partners & Integrations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We work with industry leaders to provide you with the most reliable, 
            secure, and feature-rich logistics platform.
          </p>
        </div>

        {/* Main Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => {
            const Logo = partner.logo;
            
            return (
              <div 
                key={partner.name}
                className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 text-center group"
              >
                <div className="inline-flex p-4 bg-gray-100 dark:bg-gray-800 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <Logo className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {partner.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {partner.description}
                </p>
                
                <span className="inline-block bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                  {partner.category}
                </span>
              </div>
            );
          })}
        </div>

        {/* Integration Badges */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Seamless Integrations
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Connect Swiftify with your existing tools and platforms
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {integrations.map((integration, index) => (
              <div 
                key={integration}
                className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-4 py-2 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {integration}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
              View All Integrations →
            </button>
          </div>
        </div>

        {/* API Section */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Developer-Friendly API
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Build custom integrations with our comprehensive RESTful API. 
              Complete documentation, SDKs, and developer tools included.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">REST API with JSON responses</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Real-time webhooks for updates</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">SDKs for popular languages</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-700 dark:text-gray-300">Interactive documentation</span>
              </li>
            </ul>
            
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              View API Docs
            </button>
          </div>
          
          <div className="bg-gray-900 rounded-xl p-6 text-green-400 font-mono text-sm overflow-x-auto">
            <div className="text-gray-400 mb-2">// Example API request</div>
            <pre>{`curl -X POST \\
  https://api.swiftify.com/v1/shipments \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sender": {
      "name": "John Doe",
      "address": "123 Main St, SF, CA"
    },
    "receiver": {
      "name": "Jane Smith", 
      "address": "456 Oak Ave, LA, CA"
    },
    "package": {
      "weight": "2.5",
      "description": "Electronics"
    }
  }'`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;