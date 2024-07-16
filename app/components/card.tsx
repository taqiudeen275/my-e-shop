import React from 'react'
import Image from "next/image";
import { Star1, TicketDiscount } from "iconsax-react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductCard = () => {
  return (
    <>
    <div className="w-[16rem] h-[22rem] rounded-3xl overflow-hidden  bg-purple-300/50  border-purple-500/20 text-white backdrop-blur-lg relative">
            <div className="h-[14rem] w-full overflow-hidden rounded-3xl mb-3">
            <Image src={'/boot.jpg'} width={250} height={250} className="w-full h-full object-cover transition-transform  hover:scale-[1.2]" alt="product image" />
            </div>
            <div className="bg-primary p-1 rounded-full absolute top-2 left-2 flex"><TicketDiscount /> -15%</div>
            <div className="bg-primary p-1 rounded-full absolute top-2 right-2 flex"><Heart />   </div>
            <div className="space-y-5">
              {/* Name and Price */}
              <div className="flex justify-between items-center px-3">
                <h1 className="font-bold w-[50%]">Product Name Long Name</h1>
                <h2 className="text-sm">GH₵ 500,000.00</h2>
              </div>
              <div className="flex justify-between px-3">
                <div className="flex items-center"><Star1 />  4.6</div>
                <Button className="rounded-full">Add To Cart</Button>
              </div>
            </div>
          </div>
    </>
  )
}

export default ProductCard