'use client'
import React, { useEffect, useState } from "react";
import { CartItem } from "./components";
import { Table, TableBody, TableHead, TableRow } from "@/components/ui/table";
import { useCookies } from 'next-client-cookies';
import pb from "@/lib/pocketbase_client";
import { CartProps, CartItemProps, fetchCartWithItemsAndProducts } from "../sever/cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { randomInt } from "crypto";
import { Triangle } from "iconsax-react";

export default function CartPage() {
  const [cart, setCart] = useState<CartProps | null>();
  const [changes, setChanges] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  const cookies = useCookies();

  useEffect(() => {
    const fetchInitialData = async () => {
      pb.client.authStore.loadFromCookie(cookies.get('pb_auth') ?? "")
      const cartResponse = await fetchCartWithItemsAndProducts(pb.client.authStore.model?.id);
      setCart(cartResponse)
    };
    setIsLoading(true);
    fetchInitialData();
    setIsLoading(false);
  }, [cookies, changes]);
  return (
    isLoading ?
      <div className="h-screen w-screen flex justify-center items-center">
        < span className="flex align-center justify-center animate-spin" > <Triangle className="" /> </span >
      </div > :
      <div className="w-full  pt-24  p-12 sm:p-24">
        <h2 className="text-xl sm:text-3xl font-bold mb-4">My Cart</h2>
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-start w-full">
          <div className="w-full lg:w-2/3 carttable rounded-md py-6">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">

              {(cart?.cart_items.length === 0) ?
                <div className="w-full h-full justify-center items-center">
                  <p>No Product in Cart</p>
                  <Button variant={"link"}><Link href={"/products"} >Contineu Shopping</Link></Button>
                </div> : <Table className="min-w-full divide-y divide-gray-200">
                  <thead >
                    <TableRow>
                      <TableHead
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product
                      </TableHead>
                      <TableHead
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </TableHead>
                      <TableHead
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </TableHead>
                      <TableHead
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total Price
                      </TableHead>
                      <TableHead
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >

                      </TableHead>
                    </TableRow>
                  </thead>
                  <TableBody className=" divide-y divide-gray-200">

                    {cart?.cart_items.map((product: CartItemProps) => (
                      <CartItem key={product.id} cartProduct={product} cartId={cart.id} onUpdate={(val) => setChanges(val)} />
                    ))}
                  </TableBody>
                </Table>}

            </div>
          </div>
          <div className="w-full lg:w-1/3 mb-5 px-4 md:px-8">
            <div className="flex flex-col gap-2">

              <form action="#" method="post">
                <div className="flex flex-col gap-3 p-3 rounded-lg">
                  <h3 className="font-bold text-xl">Cart Total</h3>
                  <div className="gap-3 grid grid-cols-2">
                    <h3 className="">Subtotal</h3>
                    <h3 className="font-semibold text-right">${cart?.total}</h3>
                  </div>
                  <div className="gap-3 grid grid-cols-2">
                    <h3 className="">Discount</h3>
                    <h3 className="font-semibold text-right">${cart?.discount}</h3>
                  </div>
                  <div className="gap-3 grid grid-cols-2">
                    <h3 className="">Total</h3>
                    <h3 className="font-semibold text-right">${cart?.total}</h3>
                  </div>
                  <Link href={"/checkout"}><button className="border rounded-full p-2 bg-gray-950 text-white w-full">

                    Proceed to checkout

                  </button></Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

  );
}
