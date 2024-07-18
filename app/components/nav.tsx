'use client'

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "iconsax-react";
import Logo from './logo';
import { ModeToggle } from './theme-toggler';
import LoginLoginBtn from './log';
import pb from '@/lib/pocketbase_client';
import { usePathname } from 'next/navigation';


const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const pathname = usePathname();
    useEffect(() => {
        if (pathname.includes("/login")){
          setHasScrolled(true);
          }
        const handleScroll = () => {
          if (window.scrollY > 0 ) {
            setHasScrolled(true);
          } else {
            setHasScrolled(false);
           
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [pathname]);
    return (
        <div className={`w-full flex justify-between items-center px-24 py-4 fixed top-0 z-40 ${hasScrolled ? 'bg-background/50 border-b backdrop-blur-md' : 'bg-transparent'}`}>
            <Logo />
            <div className="flex items center">
                <Link href="#" ><Button className={`${hasScrolled ? 'text-foreground' : 'text-white' }`} variant={"link"}>Home</Button></Link>
                <Link href="#" ><Button className={`${hasScrolled ? 'text-foreground' : 'text-white' }`} variant={"link"}>Products</Button></Link>
                <Link href="#" ><Button className={`${hasScrolled ? 'text-foreground' : 'text-white' }`} variant={"link"}>About Us</Button></Link>
            </div>
            <div className='flex gap-3'>
                <Link href="#" ><ShoppingCart className={`${hasScrolled ? 'text-foreground' : 'text-white' }`} size="32" variant="TwoTone" /></Link>
                <LoginLoginBtn  />
                <ModeToggle />
            </div>
        </div>
    )
}



export default NavigationBar