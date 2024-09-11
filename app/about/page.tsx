/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const featuredProducts = [
    { title: "Kente Cloth", description: "Traditional Ghanaian woven fabric", price: 99.99 },
    { title: "Adinkra Symbols Wall Art", description: "Handcrafted wooden wall decoration", price: 59.99 },
    { title: "Ashanti Stool", description: "Authentic hand-carved wooden stool", price: 129.99 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to FGRTTVOUT</h1>
        <p className="text-xl">Discover Authentic Ghanaian and African Arts</p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        
      </section>

      <section className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="max-w-2xl mx-auto">
          At FGRTTVOUT, we're dedicated to showcasing the vibrant creativity of Ghanaian and African artisans. 
          Our curated collection brings you authentic, high-quality products that carry cultural significance.
        </p>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Start Exploring</h2>
        <Button size="lg">Shop Now</Button>
      </section>
    </div>
  );
};

export default LandingPage;