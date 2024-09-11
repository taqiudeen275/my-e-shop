"use client";

import React, { useEffect,useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ProductCard, { ProductProps } from "./product-card"
import { getProducts } from "../sever/general";
import { RecordModel } from "pocketbase";

export function HorizontalScroll() {
  const [products, setProducts] = useState<RecordModel[]>([]);

  useEffect(() => {
  
    const fetchInitialData = async () => {
      const products = await getProducts(['images'], "isFeatured = true");
      setProducts(products)
    }
  fetchInitialData();
  }, [])
  return (
    <Carousel
      opts={{
        align: "start",

      }}
      className="w-full flex justify-center"
    >
      <CarouselContent>
        {products.map((product, index) => (
          <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                <CardContent className="flex aspect-square items-center justify-center p-6 w-full ">
                <ProductCard product={product} />
                </CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
