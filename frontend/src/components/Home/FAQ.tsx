import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How do I track my package?',
      answer: 'Simply enter your tracking ID on our Track page or use the search bar in the navigation. You\'ll get real-time updates on your package location, delivery status, and estimated arrival time.'
    },
    {
      question: 'What are your delivery hours?',
      answer: 'We deliver Monday through Saturday from 8 AM to 8 PM in most areas. Sunday delivery is available for premium services in select metropolitan areas. Same-day delivery is available for packages scheduled before 2 PM.'
    },
    {
      question: 'How much does shipping cost?',
      answer: 'Shipping costs depend on package size, weight, distance, and delivery speed. Our rates start from $15 for local deliveries. Use our quick quote tool on the homepage for an instant estimate based on your specific needs.'
    },
    {
      question: 'Do you offer same-day delivery?',
      answer: 'Yes! Same-day delivery is available in major metropolitan areas for packages scheduled before 2 PM. This service includes real-time tracking and priority handling with additional fees starting from $25.'
    },
    {
      question: 'What if my package is damaged or lost?',
      answer: 'We offer comprehensive insurance coverage for all shipments. Report any damage or loss within 24 hours of expected delivery, and we\'ll process your claim quickly. Most claims are resolved within 48 hours.'
    },
    {
      question: 'Can I change my delivery address after scheduling?',
      answer: 'Yes, you can modify the delivery address before the package is out for delivery. Use the tracking page to make changes or contact our support team. Address changes may incur additional fees depending on the new location.'
    },
    {
      question: 'Do you deliver internationally?',
      answer: 'Yes, we deliver across 50 countries in North America, Europe, Africa and Asia.'
    },
    {
      question: 'How secure is my package during transit?',
      answer: 'All packages are handled with care and tracked throughout the journey. We use secure vehicles, trained drivers, and provide photo proof of delivery. High-value items can be shipped with additional security measures and signature confirmation.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/20 rounded-full text-sm text-blue-600 dark:text-blue-400 mb-6">
            <HelpCircle className="h-4 w-4 mr-2" />
            <span>Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Got Questions? We've Got Answers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find quick answers to the most common questions about our logistics services, 
            tracking, and delivery options.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
            <p className="text-lg mb-6 opacity-90">
              Our support team is available 24/7 to help you with any logistics needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Support
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Live Chat
              </button>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl mb-3">📞</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">+1 (555) 123-4567</p>
            <p className="text-gray-500 dark:text-gray-500 text-xs">Mon-Fri 8AM-8PM PST</p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl mb-3">💬</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Available 24/7</p>
            <p className="text-gray-500 dark:text-gray-500 text-xs">Instant assistance</p>
          </div>
          
          <div className="text-center p-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-3xl mb-3">📧</div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Email Support</h4>
            <p className="text-gray-600 dark:text-gray-400 text-sm">support@swiftify.com</p>
            <p className="text-gray-500 dark:text-gray-500 text-xs">Response within 2 hours</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;