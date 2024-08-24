"use client";
import React, { useState, FormEvent, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
}

interface PersonalInfoProps {
  user?: User;
  onUpdate: (updatedData: Partial<User>) => Promise<void>;
}


export const PersonalInfo: React.FC<PersonalInfoProps> = ({user = {} as User, onUpdate}) => {
  const [formData, setFormData] = useState<User>({
    id: user.id || '',
    name: user.name || '',
    username: user.username || '',
    email: user.email || '',
    avatar: user.avatar || '',
  });

  // Update formData when user prop changes
  useEffect(() => {
    setFormData({
      id: user.id || '',
      name: user.name || '',
      username: user.username || '',
      email: user.email || '',
      avatar: user.avatar || '',
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

  return(
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-gray-500">Personal Information</h2>
    
      <div className="form mt-10">
        <form onSubmit={handleSubmit}>
          <div className="form flex flex-col gap-4">
            <div className="form-group flex flex-wrap md:flex-nowrap w-full justify-between  gap-6">
              <div className="flex flex-col gap-2 md:w-[50%] w-[100%]">
                <label htmlFor="name">Fullname</label>
                <input
                  type="text"
                  className="border bg-transparent rounded-md  p-3"
                  placeholder="FullName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 md:w-[50%] w-[100%]">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="border bg-transparent rounded-md  p-3"
                  placeholder="Username"
                  name="username"
                  value={formData.username}
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
              <div className="flex flex-col gap-2 md:w-[50%] w-[100%]">
                <label htmlFor="avatar">Profile</label>
                <input
                  type="file"
                  className="border bg-transparent rounded-md p-[0.6rem] "
                  placeholder="Profile"
                  name="avatar"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center gap-2  justify-end w-full">
              <button type="submit" className="p-3 bg-gradient-to-br relative group/btn from-purple-950 to-purple-600 block dark:bg-zinc-800  text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] w-full  md:w-[49%]">Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    </div>
   )
}


export const DeliveryAddress: React.FC = () => (
  <div>
    <h2 className="text-lg font-medium text-gray-900">Delivery Address</h2>
    {/* Add delivery address fields here */}
  </div>
);

export const AccountSecurity: React.FC = () => (
  <div>
    <h2 className="text-lg font-medium text-gray-900">Account Security</h2>
    {/* Add account security fields here */}
  </div>
);
