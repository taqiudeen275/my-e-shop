import React from 'react';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const LandingPage = () => {
  const featuredProducts = [
    { title: "Kente Cloth", description: "Traditional Ghanaian woven fabric", price: 99.99 },
    { title: "Adinkra Symbols Wall Art", description: "Handcrafted wooden wall decoration", price: 59.99 },
    { title: "Ashanti Stool", description: "Authentic hand-carved wooden stool", price: 129.99 },
  ];

  return (
    <div className="container mx-auto p-12 sm:p-24">
      <header className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to FGRTTVOUT</h1>
        <p className="text-2xl text-gray-600">Discover Authentic Ghanaian and African Arts</p>
      </header>

    

      <section className="text-center mb-16 bg-yellow-50 p-8 rounded-lg">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="max-w-2xl mx-auto text-lg">
          At FGRTTVOUT, we're dedicated to showcasing the vibrant creativity of Ghanaian and African artisans. 
          Our curated collection brings you authentic, high-quality products that carry cultural significance and support local communities.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center">Why Choose FGRTTVOUT?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-bold text-xl mb-2">Authentic Products</h3>
            <p className="text-gray-600">Every item in our collection is sourced directly from skilled artisans in Ghana and across Africa.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-bold text-xl mb-2">Fair Trade</h3>
            <p className="text-gray-600">We ensure fair compensation for artisans, supporting sustainable livelihoods in their communities.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="font-bold text-xl mb-2">Cultural Education</h3>
            <p className="text-gray-600">Each product comes with information about its cultural significance and the artisan who created it.</p>
          </div>
        </div>
      </section>

      
      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold mb-8">Start Your Journey Through African Art</h2>
        <Link href="/products">
          <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 text-white">Explore Our Collection</Button>
        </Link>
      </section>

      <footer className="text-center text-gray-600">
        <p>© 2024 FGRTTVOUT. All rights reserved.</p>
        <p>Bringing the beauty of Ghana and Africa to your doorstep.</p>
      </footer>
    </div>
  );
};

export default LandingPage;