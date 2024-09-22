import { Section } from "lucide-react";
import Hero from "./components/hero";
import { Button } from "@/components/ui/button";
import { TestimonialSlider } from "./components/testimony";
import Footer from "./components/footer";
import FloatingButton from "./components/float-button";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex min-h-screen flex-col items-center overflow-x-hidden p-12 sm:p-24">
        <section className="w-full mb-24">
          <div className="text-center text-sm sm:text-lg space-y-4 mb-10">
            <h2 className="text-purple-600 uppercase tracking-wide">Discover Our Collection</h2>
            <h1 className="sm:text-5xl text-3xl font-bold">Elevate Your Shopping Experience</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From trendy fashion to cutting-edge tech, find everything you need in one place.
            </p>
          </div>
          <div className="flex justify-center items-center flex-wrap md:flex-nowrap flex-col md:flex-row gap-4 md:gap-8">
            <div className="border p-6 w-full md:max-w-[500px] flex flex-col justify-between items-start hover:bg-purple-300/10 transition-all rounded-lg shadow-md">
              <div>
                <h3 className="font-bold text-xl mb-2">Popular Categories</h3>
                <p className="text-gray-600 mb-4">Explore our best-selling products across various categories.</p>
              </div>
              <Link href={'/products'}>
                <Button className="rounded-full">Shop Now</Button>
              </Link>
            </div>
            <div className="border p-6 w-full md:max-w-[500px] flex flex-col justify-between items-start hover:bg-purple-300/10 transition-all rounded-lg shadow-md">
              <div>
                <h3 className="font-bold text-xl mb-2">New Arrivals</h3>
                <p className="text-gray-600 mb-4">Be the first to check out our latest and trendiest items.</p>
              </div>
              <Link href={'/products'}>
                <Button className="rounded-full">Explore</Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="w-full mb-24">
          <div className="text-left text-sm sm:text-lg space-y-4 mb-10">
            <h2 className="text-purple-600 uppercase tracking-wide">Customer Stories</h2>
            <h1 className="sm:text-5xl text-3xl font-bold">Hear from Our Happy Shoppers</h1>
            <p className="text-gray-600 max-w-2xl">
              Don't just take our word for it - see what our customers have to say about their shopping experience with us.
            </p>
          </div>
          <TestimonialSlider />
        </section>
        <section className="w-full mb-24">
          <div className="text-center text-sm sm:text-lg space-y-4 mb-10">
            <h2 className="text-purple-600 uppercase tracking-wide">Our Commitment</h2>
            <h1 className="sm:text-5xl text-3xl font-bold">Why Choose Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're dedicated to providing you with the best shopping experience possible.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="font-bold text-xl mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">We carefully curate all our products to ensure the highest quality.</p>
            </div>
            <div className="text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders quickly with our efficient shipping process.</p>
            </div>
            <div className="text-center p-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="font-bold text-xl mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer support team is always here to help you.</p>
            </div>
          </div>
        </section>

        <section className="w-full text-center mb-24">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Shopping?</h2>
          <Link href={'/products'}>
            <Button size="lg" className="rounded-full">
              Browse All Products
            </Button>
          </Link>
        </section>
      </main>
      <Footer />
   
    </>
  );
}