'use client';

import React from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Logout } from "iconsax-react";
import Logo from './logo';
import { ModeToggle } from './theme-toggler';
import pb from '@/lib/pocketbase_client';
import {useRouter} from "next/navigation";


const NavigationBar = () => {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await pb.logoutUser();
            router.replace('/login');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    return (
        <div className=" w-full flex justify-between items-center px-24 py-4">
            <Logo />
            <div className="flex items center">
                <Link href="#" ><Button variant={"link"}>Home</Button></Link>
                <Link href="#" ><Button variant={"link"}>Products</Button></Link>
                <Link href="#" ><Button variant={"link"}>About Us</Button></Link>
            </div>

            <div className='flex gap-3'>
                <Link href="#" ><ShoppingCart size="32" variant="TwoTone" /></Link>
                <Link href="/login" ><Button>Login</Button></Link>
                <Button variant="ghost" className="mx-1" onClick={handleLogout}><Logout/></Button>
                <ModeToggle />
            </div>
        </div>
    )
}

export default NavigationBar