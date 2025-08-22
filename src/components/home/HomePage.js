import React from 'react';
import './HomePage.css';
import HeroBanner from './HeroBanner';
import CategoryBrowser from './CategoryBrowse';
import ProductSection from './ProductSection';
import BrandStrip from './BrandStrip';

const HomePage = () => {
  return (
    <div className="homepage">
      <HeroBanner />
      <div className="homepage-content">
        <CategoryBrowser />
        <ProductSection />
        <BrandStrip />
      </div>
    </div>
  );
};

export default HomePage;