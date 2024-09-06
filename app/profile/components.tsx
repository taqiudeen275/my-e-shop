"use client";
import { Button } from '@/components/ui/button';
import React, { useState, FormEvent, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface User {
  phone: string;
  id: string;
  name: string;
  username: string;
  email: string;
}

interface PersonalInfoProps {
  user?: User;
  onUpdate: (updatedData: Partial<User>) => Promise<void>;
}


export const PersonalInfo: React.FC<PersonalInfoProps> = ({ user = {} as User, onUpdate }) => {
  const [formData, setFormData] = useState<User>({
    id: user.id || '',
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
  });

  // Update formData when user prop changes
  useEffect(() => {
    setFormData({
      id: user.id || '',
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
    phone: user.phone || '',

    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? e.target.files?.[0] || '' : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'id') {
        data.append(key, value);
      }
    });

    try {
      await onUpdate(Object.fromEntries(data));
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-gray-500">Personal Information</h2>

      <h1><b>Full Name:</b> {user.name}</h1>
      <h1><b>Username: </b> {user.username}</h1>
      <h1><b>Email: </b> {user.email}</h1>
      <h1><b>Phone Number: </b> {user.phone}</h1>

      <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="form mt-10">
        <form onSubmit={handleSubmit}>
          <div className="form flex flex-col gap-4">
            <div className="form-group flex flex-wrap md:flex-nowrap w-full justify-between  gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Fullname</label>
                <input
                  type="text"
                  className="border bg-transparent rounded-md  p-3"
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
              <div className="flex flex-col gap-2 md:w-[50%] w-[100%]">
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
              <Button>
                <button type="submit">Save</button>
              </Button>
            </div>
          </div>
        </form>
      </div>
      </DialogContent>
    </Dialog>
    
    </div>
  )
}


export const DeliveryAddress: React.FC = () => (
  <div>
    <h2 className="text-lg font-medium text-gray-900">Delivery Address</h2>
    {/* Add delivery address fields here */}
  </div>
);

export const MyOrders: React.FC = () => (
  <div>
    <h2 className="text-lg font-medium text-gray-900">My Orders</h2>
    {/* Add account security fields here */}
  </div>
);
