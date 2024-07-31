
import { Section } from "lucide-react";
import Hero from "./components/hero";
import { Button } from "@/components/ui/button";
import { TestimonialSlider } from "./components/testimony";
import Footer from "./components/footer";
import FloatingButton from "./components/float-button";

export default async function Home() {

  const testimonials = [
    { id: 1, name: "John Doe", content: "Great product! Highly recommended." },
    { id: 2, name: "Jane aSmith", content: "Exfgcellent service and support." },
    { id: 3, name: "Jane saSmith", content: "Excelleqwsqwnt service and support." },
    { id: 4, name: "Jane sdsSmith", content: "Excellent service and support." },
    { id: 5, name: "Jane Sddfdfmith", content: "sdfdExcellent service and support." },
    // Add more testimonials...
  ];
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };
  return (
    <>
      <Hero />
    <main className="flex min-h-screen flex-col items-center overflow-x-hidden  p-12 sm:p-24">
      <section className="w-full mb-24">
        <div className="text-center text-sm sm:text-lg  space-y-4 mb-10">
          <h1 className="">Discover</h1>
          <h1 className="sm:text-5xl text-2xl font-bold">Shop with Ease</h1>
          <h1 className="">Explore our wide range of products</h1>
        </div>
        <div className="flex justify-center items-center flex-wrap md:flex-nowrap flex-col md:flex-row gap-4 md:gap-8 ">
        
          <div className="border p-3 w-full md:max-w-[500px] flex justify-between items-center hover:bg-purple-300/10 transition-all">
           <div className="font-bold">Browse Popular Catergories </div>
           <Button className="rounded-full">Shop Now</Button>    
          </div>
          <div className="border p-3 w-full md:max-w-[500px] flex justify-between items-center hover:bg-purple-300/10 transition-all">
           <div className="font-bold"> Discover New Arrivals </div>
           <Button className="rounded-full">Explore</Button>    
          </div>
        </div>
      </section>
      <section className="w-full">
      <div className="text-left text-sm sm:text-lg  space-y-4 mb-10">
          <h1 className="">Testimonies</h1>
          <h1 className="sm:text-5xl text-2xl font-bold">Satisfied Customers</h1>
          <h1 className="">Hear what our customers have to say about us</h1>
        </div>
        <TestimonialSlider />
      </section>
    </main>
    <Footer />
    {/* <FloatingButton >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
    </FloatingButton> */}
    </>
  );
}
