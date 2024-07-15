
import React from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "iconsax-react";
import Logo from './logo';
import { ModeToggle } from './theme-toggler';
import LoginLoginBtn from './log';
import pb from '@/lib/pocketbase_client';
import { cookies } from 'next/headers';


const NavigationBar = () => {

    pb.client.authStore.loadFromCookie(cookies().get('pb_auth')?.value ?? "")
    console.log("dsfd", pb.client.authStore.model)
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
                <LoginLoginBtn  userInfo={pb.client.authStore.model} />
                <ModeToggle />
            </div>
        </div>
    )
}



export default NavigationBar