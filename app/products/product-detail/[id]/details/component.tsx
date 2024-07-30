"use client"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"
import pb from "@/lib/pocketbase_client"
import { StarHalf,Star } from "lucide-react"
import { Star1 } from "iconsax-react"

export function ProductImages({images, id}:{images: string[], id: string}) {
  return (
    <Carousel className="w-full max-h-[60vh] aspect-video">
      <CarouselContent>
        {images.map((img, index) => (
        <Image key={index} src={`${pb.productImageBaseURL}${id}/${img}`} alt="" width={1000} height={1000} className="w-full aspect-video object-center object-cover rounded-3xl" />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}




export const StarRating = ({ rating }:{rating: number}) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="star-rating flex text-primary">
      {[...Array(fullStars)].map((_, index) => (
        <Star1 key={index} />
      ))}
      {hasHalfStar && <StarHalf />}
    </div>
  );
};
