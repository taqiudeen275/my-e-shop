import React from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "iconsax-react";
import Logo from './logo';
import { ModeToggle } from './theme-toggler';

const NavigationBar = () => {
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
                <Link href="#" ><Button>Login</Button></Link>
                <ModeToggle />
            </div>
        </div>
    )
}

export default NavigationBar