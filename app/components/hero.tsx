"use client";
import { motion } from "framer-motion";
import React, { useEffect } from 'react'
import { ImagesSlider } from "./image-slider";
import ProductCard from "./product-card";
import { getProducts, getUsers } from "../sever/general";
import { HorizontalScroll } from "./top-sales";

const Hero = () => {
  // useEffect(() => {

  //   const fetchInitialData = async () => {

  //   }
  // fetchInitialData();
  // })

  const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
  ]
  return (
    <ImagesSlider className="h-fit" images={images}>
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
        className="z-50 flex flex-col items-center justify-center h-fit  w-full"
      >
        <div className="mt-20 pb-8">
          <motion.p className="font-bold text-xl md:text-6xl  text-white py-4 px-4 sm:px-0">
            <span className="text-2xl">Welcome to My E-Shop</span> <br />
            Discover the Perfect Products you desire
          </motion.p>
          <button className="px-4 py-2 backdrop-blur-sm border bg-purple-300/10 border-purple-500/20 text-white mx-auto text-center rounded-full relative mt-4">
            <span>Shop now →</span>
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-purple-500 to-transparent" />
          </button>
        </div>
        <div className="sm:px-4 p-8 backdrop-blur-sm border bg-purple-300/10 border-purple-500/50 text-white  rounded-t-3xl  w-full">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Our Best Selling Products</h1>
          <div className="">
            <HorizontalScroll />
          </div>
        </div>
      </motion.div>
    </ImagesSlider>
  )
}

export default Hero