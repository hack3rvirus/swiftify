import React from 'react';
import { ArrowRight, Clock, User } from 'lucide-react';

const BlogTeaser: React.FC = () => {
  const articles = [
    {
      title: '10 Essential Packing Tips for Safe Shipping',
      excerpt: 'Learn professional packing techniques to ensure your items arrive safely every time.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
      category: 'Tips & Guides',
      readTime: '5 min read',
      author: 'Sarah Wilson',
      date: 'Jan 15, 2025'
    },
    {
      title: 'The Future of Logistics: AI and Real-Time Tracking',
      excerpt: 'Discover how artificial intelligence is revolutionizing package delivery and tracking.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
      category: 'Technology',
      readTime: '8 min read',
      author: 'Mike Chen',
      date: 'Jan 12, 2025'
    },
    {
      title: 'Sustainable Shipping: Reducing Your Carbon Footprint',
      excerpt: 'Simple strategies to make your shipping more environmentally friendly.',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=250&fit=crop',
      category: 'Sustainability',
      readTime: '6 min read',
      author: 'Emma Green',
      date: 'Jan 10, 2025'
    },
    {
      title: 'E-commerce Shipping Best Practices for 2025',
      excerpt: 'Essential strategies for online businesses to optimize their shipping operations.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      category: 'Business',
      readTime: '7 min read',
      author: 'David Park',
      date: 'Jan 8, 2025'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Logistics Insights & Tips
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay informed with the latest trends, tips, and insights from the world of logistics and shipping.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article, index) => (
            <article 
              key={article.title}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {article.date}
                  </span>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium flex items-center space-x-1 group">
                    <span>Read More</span>
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay in the Loop</h3>
          <p className="text-lg mb-6 opacity-90">
            Get weekly insights on logistics trends, shipping tips, and industry updates.
          </p>
          
          <form className="max-w-md mx-auto flex space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
          
          <p className="text-sm opacity-75 mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </div>

        {/* Blog CTA */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2">
            <span>View All Articles</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogTeaser;