"use client";
import { Button } from "@/components/ui/button";
import React, { useState, FormEvent, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface User {
  phone: string;
  id: string;
  name: string;
  username: string;
  email: string;
}

interface PersonalInfoProps {
  user?: Partial<User>;
  onUpdate: (updatedData: Partial<User>) => Promise<void>;
}

export const PersonalInfo: React.FC<PersonalInfoProps> = ({
  user = {} as User,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<User>({
    id: user.id || "",
    name: user.name || "",
    username: user.username || "",
    email: user.email || "",
    phone: user.phone || "",
  });

  // Update formData when user prop changes
  useEffect(() => {
    setFormData({
      id: user.id || "",
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      phone: user.phone || "",
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? e.target.files?.[0] || "" : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "id") {
        data.append(key, value);
      }
    });

    try {
      await onUpdate(Object.fromEntries(data));
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-gray-500">
        Personal Information
      </h2>

      <table className="w-[40%] border-collapse  rounded-lg overflow-hidden">
        <tbody>
          <tr>
            <td className="py-3  font-medium">Full Name</td>
            <td className="py-3 px-6">{user.name}</td>
          </tr>
          <tr>
            <td className="py-3 font-medium">Username</td>
            <td className="py-3 px-6">{user.username}</td>
          </tr>
          <tr>
            <td className="py-3  font-medium">Email</td>
            <td className="py-3 px-6">{user.email}</td>
          </tr>
          <tr>
            <td className="py-3 font-medium">Phone</td>
            <td className="py-3 px-6">{user.phone}</td>
          </tr>
        </tbody>
      </table>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-[25%]">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you &apos; re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="form mt-10">
            <form onSubmit={handleSubmit}>
              <div className="form flex flex-col gap-4">
                <div className="form-group flex flex-wrap md:flex-nowrap w-full justify-between  gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="name">Fullname</label>
                    <input
                      type="text"
                      className="border bg-transparent rounded-md  p-3 "
                      placeholder="FullName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="border bg-transparent rounded-md  p-3"
                      placeholder="Username"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="text"
                      className="border bg-transparent rounded-md  p-3"
                      placeholder="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group flex flex-wrap md:flex-nowrap w-full justify-between  gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="border bg-transparent rounded-md p-3 "
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2  justify-end w-full">
                  <Button className="w-full">
                    <button type="submit">Save</button>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface Address {
  id: string;
  type: string;
  street: string;
  street_2: string;
  city: string;
  country: string;
  zip_code: string;
}

interface AddressInfoProps {
  address?: Partial<Address>;
  onUpdate: (updatedData: Partial<Address>) => Promise<void>;
}

export const DeliveryAddress: React.FC<AddressInfoProps> = ({
  address = {} as Address,
  onUpdate,
}) => {
  const [formData, setFormData] = useState<Address>({
    id: address.id || "",
    type: address.type || "",
    street: address.street || "",
    street_2: address.street_2 || "",
    city: address.city || "",
    country: address.country || "",
    zip_code: address.zip_code || "",
  });

  // Update formData when user prop changes
  useEffect(() => {
    setFormData({
      id: address.id || "",
      type: address.type || "",
      street: address.street || "",
      street_2: address.street_2 || "",
      city: address.city || "",
      country: address.country || "",
      zip_code: address.zip_code || "",
    });
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? e.target.files?.[0] || "" : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "id") {
        data.append(key, value);
      }
    });

    try {
      await onUpdate(Object.fromEntries(data));
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-gray-500">Delivery Address</h2>

      <table className="w-[40%] border-collapse  rounded-lg overflow-hidden">
        <tbody>
          <tr>
            <td className="py-3  font-medium">Type</td>
            <td className="py-3 px-6">{address.type}</td>
          </tr>
          <tr>
            <td className="py-3 font-medium">Street</td>
            <td className="py-3 px-6">{address.street}</td>
          </tr>
          <tr>
            <td className="py-3  font-medium">Street 2</td>
            <td className="py-3 px-6">{address.street_2 || "N/A"}</td>
          </tr>
          <tr>
            <td className="py-3 font-medium">City</td>
            <td className="py-3 px-6">{address.city}</td>
          </tr>
          <tr>
            <td className="py-3 font-medium">Country</td>
            <td className="py-3 px-6">{address.country}</td>
          </tr>
          <tr>
            <td className="py-3 font-medium">Zip Code</td>
            <td className="py-3 px-6">{address.zip_code}</td>
          </tr>
        </tbody>
      </table>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline"  className="w-[25%]">Edit Address</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-y-scroll h-dvh  ">
          <DialogHeader>
            <DialogTitle>Edit Address</DialogTitle>
            <DialogDescription>
              Make changes to your address here. Click save when you &apos; re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="form mt-10">
            <form onSubmit={handleSubmit}>
              <div className="form flex flex-col gap-4">
                <div className="form-group flex flex-wrap md:flex-nowrap w-full justify-between  gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="name">Country</label>
                    <input
                      type="text"
                      className="border bg-transparent rounded-md  p-3 "
                      placeholder="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                    <label htmlFor="username">City</label>
                    <input
                      type="text"
                      className="border bg-transparent rounded-md  p-3"
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <label htmlFor="phone">Street</label>
                    <input
                      type="text"
                      className="border bg-transparent rounded-md  p-3"
                      placeholder="Street"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                    />

                    <label htmlFor="phone">Street 2</label>
                    <input
                      type="text"
                      className="border bg-transparent rounded-md  p-3"
                      placeholder="Street 2"
                      name="street_2"
                      value={formData.street_2}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group flex flex-wrap md:flex-nowrap w-full justify-between  gap-6">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="email">ZipCode</label>
                    <input
                      type="text"
                      className="border bg-transparent rounded-md p-3 "
                      placeholder="Zip Code"
                      name="zip_code"
                      value={formData.zip_code}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2  justify-end w-full">
                  <Button className="w-full">
                    <button type="submit">Save</button>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};


interface Orders {
  id: string;
  type: string;
  street: string;
  street_2: string;
  city: string;
  country: string;
  zip_code: string;
}

interface AddressInfoProps {
  orders?: Partial<Orders>;
  onUpdate: (updatedData: Partial<Orders>) => Promise<void>;
}

export const MyOrders: React.FC = () => (
  <div>
    <h2 className="text-lg font-medium text-gray-500">My Orders</h2>
    

  </div>
);
