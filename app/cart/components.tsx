"use client"
import { Button } from "@/components/ui/button";
import pb from "@/lib/pocketbase_client";
import Image from "next/image";
import { RecordModel } from "pocketbase";
import { useState, useEffect } from 'react';
import { CartItemProps, decreaseCartItemQuantity, increaseCartItemQuantity } from "../sever/cart";
import { Triangle } from "iconsax-react";
import { useToast } from "@/components/ui/use-toast";

export const CartItem = ({ cartProduct, cartId, onUpdate }: { cartProduct: CartItemProps; cartId: string;  onUpdate: (val:any) => void; }) => {
  const [productQuantity, setProductQuantity] = useState(cartProduct.quantity);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false)

  const decreaseQuantity = async (cart_item_id: string, cartId: string) => {
   
    setIsLoading(true);
    const decreaseResult = await decreaseCartItemQuantity(cart_item_id, cartId);
    if (decreaseResult.success) {
      setProductQuantity(decreaseResult.newQuantity!)
      toast({
        description: decreaseResult.message,
      });
      onUpdate(decreaseResult.newTotal);
    } else {
      toast({
        description: decreaseResult.message,
      })
    }
    setIsLoading(false);

  };

  const increaseQuantity = async (cart_item_id: string, cartId: string) => {
    setIsLoading(true);
    const increaseResult = await increaseCartItemQuantity(cart_item_id, cartId);
    if (increaseResult.success) {
      setProductQuantity(increaseResult.newQuantity!);
      toast({
        description: increaseResult.message,
      });
      onUpdate(increaseResult.newTotal);
    } else {
      console.log(increaseResult.message);
    }
    setIsLoading(false);
  };
  return (
    <tr >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-24 w-24">
            <Image
              src={`${pb.client.baseUrl}/api/files/${cartProduct.product.expand?.images?.collectionId}/${cartProduct.product.expand?.images.id}/${cartProduct.product.expand?.images.photos[0]}`}
              alt={"product image"}
              width={96}
              height={96}
              className="h-24 w-24 rounded-md object-cover"
            />
          </div>
          <div className="ml-4">
            <div className="text-lg font-medium ">
              {cartProduct.product.name}
            </div>
            {cartProduct.colors && <div className="text-sm text-gray-500">
              Color: {cartProduct.selected_color_name}
            </div>}
            {cartProduct.varients && <div className="text-sm text-gray-500">
              Varient: {cartProduct.selected_varient_name}
            </div>}

          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">
          ${cartProduct.price.toFixed(2)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">

          <Button
            variant={"secondary"}
            className="px-4 py-1"
            onClick={() => decreaseQuantity(cartProduct.id, cartId)}
          >
            -
          </Button>
          <span className="px-4 py-1">
            {
              isLoading ?
                <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span> :
                productQuantity}
          </span>
          <Button
            variant={"secondary"}
            className="px-4 py-1"
            onClick={() => increaseQuantity(cartProduct.id, cartId)}
          >
            +
          </Button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium ">
          ${(cartProduct.price * productQuantity).toFixed(2)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium ">
          ${(cartProduct.price * productQuantity).toFixed(2)}
        </div>
      </td>
    </tr>
  );
};