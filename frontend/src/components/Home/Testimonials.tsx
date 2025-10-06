import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Chen',
      title: 'E-commerce Store Owner',
      company: 'StyleCraft Boutique',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b665?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "Swiftify transformed our shipping process. The real-time tracking gives our customers confidence, and we've seen a 40% reduction in support tickets about deliveries.",
      highlight: '40% reduction in support tickets'
    },
    {
      name: 'Marcus Rodriguez',
      title: 'Supply Chain Manager',
      company: 'TechFlow Industries',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "The analytics dashboard is incredible. We can optimize our shipping routes and predict delivery times with 99% accuracy. It's like having a logistics expert on our team.",
      highlight: '99% accuracy in predictions'
    },
    {
      name: 'Lisa Thompson',
      title: 'Operations Director',
      company: 'GreenLeaf Organics',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "Their eco-friendly delivery options align perfectly with our brand values. Customers love the carbon-neutral shipping, and the costs are actually lower than our previous provider.",
      highlight: 'Carbon-neutral shipping'
    },
    {
      name: 'David Park',
      title: 'Freelance Designer',
      company: 'Independent',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "As a freelancer shipping client work, reliability is everything. Swiftify's same-day delivery option has saved me from countless deadline disasters. Worth every penny!",
      highlight: 'Same-day delivery reliability'
    },
    {
      name: 'Amanda Foster',
      title: 'Customer Success Manager',
      company: 'HomeDecor Plus',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "The customer portal is fantastic. Our clients can track their orders without calling us, and the automated notifications keep everyone informed. It's improved our customer satisfaction scores significantly.",
      highlight: 'Improved satisfaction scores'
    },
    {
      name: 'Robert Kim',
      title: 'Warehouse Supervisor',
      company: 'MegaMart Distribution',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      text: "The integration with our existing systems was seamless. The API documentation is excellent, and their support team helped us get up and running in just two days.",
      highlight: 'Seamless integration'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real customers have to say 
            about their Swiftify experience.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <Quote className="h-12 w-12 text-blue-400 opacity-50" />
              <div className="flex space-x-1">
                {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            <blockquote className="text-xl md:text-2xl text-gray-900 dark:text-white font-medium mb-8 leading-relaxed">
              "{testimonials[currentSlide].text}"
            </blockquote>

            <div className="flex items-center space-x-4">
              <img
                src={testimonials[currentSlide].image}
                alt={testimonials[currentSlide].name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {testimonials[currentSlide].name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {testimonials[currentSlide].title}
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                  {testimonials[currentSlide].company}
                </p>
              </div>
            </div>

            {/* Highlight Badge */}
            <div className="mt-6 inline-block bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
              ✨ {testimonials[currentSlide].highlight}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Customer Logos */}
        <div className="mt-16">
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Trusted by leading companies worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
            {[
              'TechFlow', 'StyleCraft', 'GreenLeaf', 'HomeDecor+', 'MegaMart', 'FastTrack'
            ].map((company) => (
              <div key={company} className="text-center">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-16 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400 font-semibold">
                    {company}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;