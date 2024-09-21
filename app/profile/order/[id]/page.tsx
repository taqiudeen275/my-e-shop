"use client";
import React, { useEffect, useState } from 'react'
import { Triangle } from "iconsax-react";
import { useCookies } from 'next-client-cookies';
import pb from '@/lib/pocketbase_client';
import { fetchOrdertWithItemsAndProducts } from '@/app/sever/order';
import OrderDetailPage from '../../order';


const Orderdetails = ({ params }: { params: { id: string } }) => {
  const [order, setOrder] = useState<any | null>();
  const [changes, setChanges] = useState(0);
  const [isLoading, setIsLoading] = useState(false)


  const cookies = useCookies();

  useEffect(() => {
    const fetchInitialData = async () => {
      pb.client.authStore.loadFromCookie(cookies.get('pb_auth') ?? "")
      const cartResponse = await fetchOrdertWithItemsAndProducts(params.id);
      setOrder(cartResponse)
      console.log(cartResponse)
    };
    setIsLoading(true);
    fetchInitialData();
    setIsLoading(false);
  }, [cookies, changes, params.id]);
  return (
  <div>
    <h2 className="text-lg font-medium text-gray-500">My Orders</h2>
    
   {order&& <OrderDetailPage order={order}  />}
  </div>
)}


export default Orderdetails
    