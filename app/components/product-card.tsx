'use client'
import React, { useState } from 'react'
import Image from "next/image";
import { Star1, TicketDiscount } from "iconsax-react";
import { Check, CheckCircle2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecordModel } from 'pocketbase';
import pb from '@/lib/pocketbase_client';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';
import { useCookies } from 'next-client-cookies';
import { addToCart } from '../sever/general';


export interface ProductProps {
  id: string;
  name: string;
  price: number;
  discount: number;
  image_url: string;
  rating: number;
}

const ProductCard = ({ product, inProduct }: { product: RecordModel, inProduct?: boolean }) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  const { toast } = useToast()
  const cookies = useCookies();

  async function handleAddToCart() {
    setIsAddedToCart(true)
    pb.client.authStore.loadFromCookie(cookies.get('pb_auth') ?? "")
    const user = pb.client.authStore.model

    await addToCart(user?.id, product.id, 1, product.price
    );
    toast({
      description: "The Products has been added to cart.",
    })
    setIsAddedToCart(false)
  }
  return (
    <>

      <div className="min-w-[15rem] max-w-[16rem] h-[22rem] rounded-3xl overflow-hidden  bg-purple-300/50  border-purple-500/20 text-white backdrop-blur-lg relative transition-all hover:ring-4 ring-primary">
        <div className="h-[14rem]    w-full overflow-hidden rounded-3xl mb-3">
          <Link href={`/products/product-detail/${product.id}/details`}>
            <Image src={`${pb.client.baseUrl}/api/files/${product.expand?.images.collectionId}/${product.expand?.images.id}/${product.expand?.images.photos[0]}`} width={250} height={250} className="w-full h-full object-cover transition-transform  hover:scale-[1.2]" alt="product image" />
          </Link>
        </div>
        <div className="bg-primary p-1 rounded-full absolute top-2 left-2 flex"><TicketDiscount /> -{product.discount}</div>
        <div className="bg-primary p-1 rounded-full absolute top-2 right-2 flex"><Heart />   </div>
        <div className="space-y-5">
          {/* Name and Price */}
          <Link href={`/products/product-detail/${product.id}/details`}>
            <div className={`flex justify-between items-center px-3 ${inProduct && "text-foreground"}`}>
              <h1 className="font-bold w-[50%]">{product.name}</h1>
              <h2 className="text-sm">GH₵ {product.price}</h2>
            </div>
          </Link>
          <div className="flex justify-between px-3">
            <div className={`flex items-center ${inProduct && "text-foreground"}`}><Star1 /> {product.ratings}</div>
            <Button className="rounded-full transition-all" onClick={handleAddToCart}>{isAddedToCart ? <span className='fade-in-5 flex'><CheckCircle2 className='animate-bounce' /> Added</span> : "Add To Cart "}</Button>
          </div>
        </div>
      </div>

    </>
  )
}

export default ProductCard