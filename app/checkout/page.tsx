"use client"

import { useEffect, useState } from "react";
import StripeWrapper, { AddressForm, OrderItem } from "./components";
import { useCookies } from 'next-client-cookies';
import { CartItemProps, CartProps, fetchCartWithItemsAndProducts } from "../sever/cart";
import pb from "@/lib/pocketbase_client";
import { Table, TableBody, TableHead, TableRow } from "@/components/ui/table";
import { getAddresses } from "../sever/general";
import { RecordModel } from "pocketbase";
import { Triangle } from "lucide-react";



export default function CheckoutPage() {
  const [cart, setCart] = useState<CartProps | null>();
  const [address, setAddress] = useState<RecordModel | null>();
  const [foundAddress, setSetFoundAdress] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [amount, setAmount] = useState(0)

  const cookies = useCookies();

  useEffect(() => {
    const fetchInitialData = async () => {
      pb.client.authStore.loadFromCookie(cookies.get('pb_auth') ?? "")
      const cartResponse = await fetchCartWithItemsAndProducts(pb.client.authStore.model?.id);
      setCart(cartResponse)
      setAmount(100 * cartResponse!.total)
      const addressRes = await getAddresses([], `user="${pb.client.authStore.model?.id}"`)
      if (addressRes.length >= 0) {
        setSetFoundAdress(true)
        setAddress(addressRes[0])
      }
    };
    setIsLoading(true);
    fetchInitialData();

    setIsLoading(false);

  }, [cookies]);
  return (
    <>
      {
        isLoading ?
          <div className="h-screen w-screen flex justify-center items-center">
            <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span>
          </div> :
          <section className=" p-12 pt-24 sm:p-24">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              <div className="col-span-5 lg:col-span-3">
                {!foundAddress ?
                  <div className="container mx-auto p-4">

                    <h1 className="text-2xl font-bold mb-4">Add Shipping Address</h1>
                    <AddressForm />

                  </div> :
                  <>
                    <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                    <div className="space-y-2">
                      <p className="font-medium">{address?.name}</p>
                      <p>{address?.street}</p>
                      <p>{`${address?.city}, ${address?.state} ${address?.zip_code}`}</p>
                      <p>{address?.country}</p>

                    </div>
                  </>
                }
              </div>
              <div className="col-span-5 lg:col-span-2 p-4 space-y-6">
                <StripeWrapper price={amount} cart={cart!} />
                <h1 className="text-2xl font-bold mb-4">My Order</h1>

                <Table className="min-w-full divide-y divide-gray-200">
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
                        Total Price
                      </TableHead>

                    </TableRow>
                  </thead>
                  <TableBody className=" divide-y divide-gray-200">

                    {cart?.cart_items.map((product: CartItemProps) => (
                      <OrderItem key={product.id} cartProduct={product} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>



          </section >}

    </>
  );
}