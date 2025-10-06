import React from 'react';
import Hero from '../components/Home/Hero';
import Features from '../components/Home/Features';
import HowItWorks from '../components/Home/HowItWorks';
import CoverageMap from '../components/Home/CoverageMap';
import Stats from '../components/Home/Stats';
import Testimonials from '../components/Home/Testimonials';
import Sustainability from '../components/Home/Sustainability';
import BlogTeaser from '../components/Home/BlogTeaser';
import Partners from '../components/Home/Partners';
import FAQ from '../components/Home/FAQ';
import AppTeaser from '../components/Home/AppTeaser';


const Home: React.FC = () => {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Features />
      <CoverageMap />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Sustainability />
      <BlogTeaser />
      <Partners />
      <FAQ />
      <AppTeaser />
    </div>
  );
};

export default Home;