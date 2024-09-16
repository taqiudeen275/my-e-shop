"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { PersonalInfo, DeliveryAddress, MyOrders } from "./components";
import pb from "@/lib/pocketbase_client";
import { useCookies } from "next-client-cookies";
import { AuthModel } from "pocketbase";
import {
  ExportCookies,
  getAddressById,
  getAddresses,
  updateAddressById,
  updateUserById,
} from "../sever/general";
import { useToast } from "@/components/ui/use-toast";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<
    "personal" | "delivery" | "orders"
  >("personal");
  const [address, setAddress] = useState({});
  const [user, setUser] = useState<AuthModel | null>();
  const { toast } = useToast();
  const cookies = useCookies();
  const path = usePathname();

  
  useEffect(() => {
    // setPath(path)
    setPbCookie();

    function setPbCookie() {
      pb.client.authStore.loadFromCookie(cookies.get("pb_auth") ?? "");
      setUser(pb.client.authStore.model);
    }
  }, [cookies, path]);

  const handleUpdateUser = async (updatedData: any) => {
    if (user) {
      const resupdatedUser = await updateUserById(user.id, updatedData);
      await ExportCookies();
      setUser(resupdatedUser);
      toast({
        description: "User updated successfully",
      });
    }
  };

  const handelUpdatedAddress = async (updateData: any) => {
    if (address) {
      const resupdatedAddress = await updateAddressById(address.id, updateData);
      setAddress(resupdatedAddress);
      toast({
        description: "Address updated successfully",
      });
    }
  };

  const tabContent: Record<typeof activeTab, JSX.Element> = {
    personal: <PersonalInfo user={user || undefined } onUpdate={handleUpdateUser} />,
    delivery: (
      <DeliveryAddress address={address} onUpdate={handelUpdatedAddress} />
    ),
    orders: <MyOrders />,
  };

  useEffect(() => {
    let fncall = false;
    const getuserAddress = async (user: any) => {
      if (user) {
        const addressRes = await getAddresses([], `user="${user.id}"`)
        if (addressRes.length >= 0) {
          setAddress(addressRes[0])
        }
        
      }
    };
    if(!fncall){
      getuserAddress(user);
      fncall = true;
    }

  }, [user]);

  return (
    <div className="w-full mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div className="relative mb-16">
        <div className="h-48 sm:h-72 w-full relative">
          <Image
            src={
              user?.avatar
                ? `${pb.client.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}`
                : "/userdefaultpic.jpg"
            }
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg blur-sm"
            alt="Background"
          />
        </div>
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <Image
            src={
              user?.avatar
                ? `${pb.client.baseUrl}/api/files/${user.collectionId}/${user.id}/${user.avatar}`
                : "/userdefaultpic.jpg"
            }
            width={128}
            height={128}
            className="rounded-full border-4 border-white shadow-lg"
            alt="Profile"
          />
        </div>
      </div>

      <div className="mt-24">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {[
              { name: "Personal Info", key: "personal" },
              { name: "Delivery Address", key: "delivery" },
              { name: "My Orders", key: "orders" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`${
                  activeTab === tab.key
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-8">{tabContent[activeTab]}</div>
    </div>
  );
}
