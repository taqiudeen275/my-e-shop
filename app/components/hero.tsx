"use client";
import { motion } from "framer-motion";
import React from 'react'
import { ImagesSlider } from "./image-slider";
import ProductCard from "./card";

const Hero = () => {

  const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
  ]
  return (
    <ImagesSlider className="h-screen" images={images}>
      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="z-50 flex flex-col items-center justify-between h-full"
      >
        <div className="mt-24">
          <motion.p className="font-bold text-xl md:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            <span className="text-2xl">Welcome to My E-Shop</span> <br />
            Discover the Perfect Products you desire
          </motion.p>
          <button className="px-4 py-2 backdrop-blur-sm border bg-purple-300/10 border-purple-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Shop now →</span>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-purple-500 to-transparent" />
          </button>
        </div>
        <div className="px-4 p-8 backdrop-blur-sm border bg-purple-300/10 border-purple-500/20 text-white mx-auto rounded-lg absolute bottom-0 w-full">
          <h1 className="text-2xl font-bold font-mono mb-4">Our Best Selling Products</h1>
         <div className="flex justify-around"> <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard /></div>
        </div>
      </motion.div>
    </ImagesSlider>
  )
}

export default Hero