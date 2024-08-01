"use client";

import Image from "next/image";
import { useState } from "react";

export const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "personal" | "delivery" | "security"
  >("personal");

  const tabContent: Record<typeof activeTab, JSX.Element> = {
    personal: <PersonalInfo />,
    delivery: <DeliveryAddress />,
    security: <AccountSecurity />,
  };

  return (
    <div className="w-full mx-auto pb-12 px-4 sm:px-6 lg:px-8">
      <div className="relative mb-16">
        <div className="h-48 sm:h-72 w-full">
          <Image
            src="/userdefaultpic.jpg"
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg blur-sm"
            alt="Background"
          />
        </div>
        <div className="absolute bottom-0 left-8 transform translate-y-1/2">
          <Image
            src="/userdefaultpic.jpg"
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
              { name: "Account Security", key: "security" },
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
};

const PersonalInfo: React.FC = () => (
  <div className="flex flex-col gap-2">
    <h2 className="text-lg font-medium text-gray-500">Personal Information</h2>

    <div className="form mt-10">
      <form action="" method="post">
        <div className="form flex flex-col gap-4">
        <div className="form-group flex flex-wrap md:flex-nowrap w-full justify-between  gap-6">
        <div className="flex flex-col gap-2 md:w-[50%] w-[100%]">
            <label htmlFor="fullname">Fullname</label>
            <input
              type="text"
              className="border bg-transparent rounded-md  p-3"
              placeholder="FullName"
              name="name"
            />
          </div>
          <div className="flex flex-col gap-2 md:w-[50%] w-[100%]">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="border bg-transparent rounded-md  p-3"
              placeholder="Username"
              name="username"
            />
          </div>
          
        </div>
        <div className="form-group flex flex-wrap md:flex-nowrap w-full justify-between  gap-6">
        <div className="flex flex-col gap-2 md:w-[50%] w-[100%]">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="border bg-transparent rounded-md p-3 "
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="flex flex-col gap-2 md:w-[50%] w-[100%]">
            <label htmlFor="profile">Profile</label>
            <input
              type="file"
              className="border bg-transparent rounded-md p-[0.6rem] "
              placeholder="Profile"
              name="profile"
            />
          </div>
        </div>
          <div className="flex items-center gap-2  justify-end w-full">
            <button className="p-3 border bg-primary rounded-lg w-full  md:w-[40%]">Save Changes</button>
          </div>

        </div>
        
        
      </form>
    </div>
  </div>
);

const DeliveryAddress: React.FC = () => (
  <div>
    <h2 className="text-lg font-medium text-gray-900">Delivery Address</h2>
    {/* Add delivery address fields here */}
  </div>
);

const AccountSecurity: React.FC = () => (
  <div>
    <h2 className="text-lg font-medium text-gray-900">Account Security</h2>
    {/* Add account security fields here */}
  </div>
);
