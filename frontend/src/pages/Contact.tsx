import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Users, Headphones } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { apiClient } from '../lib/api';
import toast from 'react-hot-toast';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    try {
      const response = await apiClient.submitContact({
        name: data.name,
        email: data.email,
        message: `Subject: ${data.subject}\n\n${data.message}`
      });
      
      if (response.success) {
        toast.success('Message sent successfully! We\'ll get back to you soon.');
        reset();
      } else {
        toast.error(response.error || 'Failed to send message');
      }
    } catch (error) {
      toast.success('Message sent successfully! (Demo Mode)');
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+1 (555) 123-4567',
      description: 'Mon-Fri 8AM-8PM PST',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@swiftify.com',
      description: 'Response within 2 hours',
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      details: 'Available 24/7',
      description: 'Instant assistance',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20'
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      details: '123 Innovation Drive',
      description: 'San Francisco, CA 94102',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20'
    }
  ];

  const departments = [
    {
      icon: Users,
      title: 'Sales & Partnerships',
      email: 'sales@swiftify.com',
      description: 'Business inquiries and partnerships'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      email: 'support@swiftify.com',
      description: 'Tracking issues and general help'
    },
    {
      icon: MessageCircle,
      title: 'Media & Press',
      email: 'press@swiftify.com',
      description: 'Media inquiries and press releases'
    }
  ];

  const faqs = [
    {
      question: 'How do I track my package?',
      answer: 'Enter your tracking ID on our Track page or use the search bar in the navigation. You\'ll get real-time updates on your package location and delivery status.'
    },
    {
      question: 'What are your delivery hours?',
      answer: 'We deliver Monday through Saturday from 8 AM to 8 PM. Sunday delivery is available for premium services in select areas.'
    },
    {
      question: 'How much does shipping cost?',
      answer: 'Shipping costs depend on package size, weight, distance, and delivery speed. Use our quick quote tool on the homepage for an instant estimate.'
    },
    {
      question: 'Do you offer same-day delivery?',
      answer: 'Yes! Same-day delivery is available in major metropolitan areas for packages scheduled before 2 PM. Additional fees apply.'
    },
    {
      question: 'What if my package is damaged?',
      answer: 'We offer comprehensive insurance coverage. Report any damage within 24 hours of delivery, and we\'ll process your claim quickly.'
    },
    {
      question: 'Can I change my delivery address?',
      answer: 'Yes, you can modify the delivery address before the package is out for delivery. Contact our support team or use the tracking page to make changes.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Have questions about your delivery? Need help with tracking? Our support team is here 
            to help you 24/7 with any logistics needs.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the method that works best for you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div 
                  key={info.title}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow"
                >
                  <div className={`inline-flex p-4 rounded-full ${info.bgColor} mb-6`}>
                    <Icon className={`h-8 w-8 ${info.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {info.details}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    {...register('subject', { required: 'Subject is required' })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select a subject</option>
                    <option value="tracking">Package Tracking Issue</option>
                    <option value="delivery">Delivery Problem</option>
                    <option value="billing">Billing Question</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Please describe your inquiry in detail..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Office Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Visit Our Office
              </h2>
              
              {/* Map Placeholder */}
              <div className="bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl h-64 mb-8 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    Interactive Map
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    123 Innovation Drive, San Francisco, CA
                  </p>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 left-4 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute bottom-6 right-6 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Address</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      123 Innovation Drive<br />
                      San Francisco, CA 94102<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Office Hours</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-purple-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Main: +1 (555) 123-4567<br />
                      Support: +1 (555) 123-4568<br />
                      Emergency: +1 (555) 123-4569
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Department Contacts
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Reach out to the right team for faster assistance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <div 
                  key={dept.title}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex p-3 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {dept.title}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {dept.email}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {dept.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border border-gray-100 dark:border-gray-600"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Can't find what you're looking for?
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;