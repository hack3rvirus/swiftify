import React from 'react';
import { Users, Award, Truck, Globe, Target, Heart, Zap, Shield } from 'lucide-react';

const About: React.FC = () => {
  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b665?w=300&h=300&fit=crop&crop=face',
      bio: 'Former logistics executive with 15+ years at FedEx and UPS. Passionate about revolutionizing delivery through technology.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO & Co-Founder',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Ex-Google engineer specializing in real-time systems and AI. Built the core tracking infrastructure from the ground up.'
    },
    {
      name: 'Lisa Thompson',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
      bio: 'Supply chain expert with deep knowledge of last-mile delivery optimization and sustainable logistics practices.'
    },
    {
      name: 'David Park',
      role: 'Head of Engineering',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Full-stack developer and system architect. Leads our engineering team in building scalable, reliable delivery solutions.'
    }
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Company Founded',
      description: 'Swiftify was born from a vision to make logistics smarter and more accessible.'
    },
    {
      year: '2024',
      title: 'Real-Time Tracking Launch',
      description: 'Launched our revolutionary real-time tracking system with AI-powered route optimization.'
    },
    {
      year: '2024',
      title: '100K Deliveries',
      description: 'Reached our first major milestone of 100,000 successful deliveries.'
    },
    {
      year: '2025',
      title: 'National Expansion',
      description: 'Expanded to 50+ cities across the United States with 24/7 operations.'
    }
  ];

  const values = [
    {
      icon: Zap,
      title: 'Speed',
      description: 'We believe time is precious. Our technology ensures the fastest possible delivery times.'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Your packages are safe with us. We guarantee secure handling and on-time delivery.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make is centered around providing the best customer experience.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'We\'re committed to reducing our environmental impact through green delivery practices.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About Swiftify
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            We're revolutionizing logistics with cutting-edge technology, making package delivery 
            faster, smarter, and more transparent than ever before.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500K+</div>
              <div className="opacity-80">Packages Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="opacity-80">Cities Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99.5%</div>
              <div className="opacity-80">On-Time Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                At Swiftify, we believe that logistics should be simple, transparent, and reliable. 
                Our mission is to connect people and businesses through intelligent delivery solutions 
                that save time, reduce costs, and create positive experiences.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                We leverage cutting-edge technology including AI-powered route optimization, 
                real-time tracking, and predictive analytics to ensure every package reaches 
                its destination safely and on time.
              </p>
              <div className="flex items-center space-x-4">
                <Target className="h-8 w-8 text-blue-600" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Speed Meets Intelligence in Every Delivery
                </span>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop"
                alt="Modern logistics warehouse"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-green-600/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core principles guide everything we do and shape the way we serve our customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={value.title}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-6">
                    <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our diverse team of logistics experts, engineers, and innovators work together 
              to deliver exceptional experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div 
                key={member.name}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 text-center border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100 dark:border-blue-900/20"
                />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From startup to industry leader, here are the key milestones in our growth story.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200 dark:bg-blue-800"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-600">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 bg-blue-600 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Fleet & Infrastructure
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              State-of-the-art vehicles and facilities ensure reliable, efficient delivery services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">1,000+ Vehicles</h3>
              <p className="text-gray-600 dark:text-gray-400">Modern fleet including electric and hybrid vehicles</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900/20 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Globe className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">200+ Hubs</h3>
              <p className="text-gray-600 dark:text-gray-400">Strategic distribution centers for optimal coverage</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/20 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <Award className="h-12 w-12 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">ISO Certified</h3>
              <p className="text-gray-600 dark:text-gray-400">Quality management and environmental standards</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <img
              src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=600&h=400&fit=crop"
              alt="Modern delivery trucks"
              className="rounded-2xl shadow-xl"
            />
            <img
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop"
              alt="Distribution warehouse"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience the Future of Delivery?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of satisfied customers who trust Swiftify for their logistics needs. 
            Fast, reliable, and intelligent delivery solutions await.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Schedule a Delivery
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;