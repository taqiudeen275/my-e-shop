'use client'

import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu, CloseSquare } from "iconsax-react";
import Logo from './logo';
import { ModeToggle } from './theme-toggler';
import LoginLoginBtn from './log';
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
      <>
        <div className={`w-full flex justify-between items-center px-4 md:px-24 py-4 fixed top-0 z-40 ${hasScrolled ? 'bg-background/50 border-b backdrop-blur-md' : 'bg-transparent'}`}>
            <Logo />
            <div className="hidden md:flex items-center">
                <Link href="#" ><Button className={`${hasScrolled ? 'text-foreground' : 'text-white' }`} variant={"link"}>Home</Button></Link>
                <Link href="#" ><Button className={`${hasScrolled ? 'text-foreground' : 'text-white' }`} variant={"link"}>Products</Button></Link>
                <Link href="#" ><Button className={`${hasScrolled ? 'text-foreground' : 'text-white' }`} variant={"link"}>About Us</Button></Link>
            </div>
            <div className='hidden md:flex gap-3'>
                <Link href="#" ><ShoppingCart className={`${hasScrolled ? 'text-foreground' : 'text-white' }`} size="32" variant="TwoTone" /></Link>
                <LoginLoginBtn  />
                <ModeToggle />
            </div>
            <div className="-mr-2 flex md:hidden">
            <Button
              variant={'default'}
              onClick={toggleMenu}
              className={`inline-flex items-center justify-center p-2 rounded-md ${hasScrolled ? "text-foreground" : "text-white"} hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <CloseSquare className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
         
        </div>
        {isOpen && (
        <div className="md:hidden fixed top-[80px] left-0 z-50 bg-background/50 border-b backdrop-blur-md w-full rounded-md px-4 py-8" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 flex items-center space-y-1 justify-center flex-wrap gap-3">
            <Link href="#"><Button className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 bg-gray-900" variant="link">Home</Button></Link>
            <Link href="#"><Button className="block px-3 py-2 rounded-md text-base font-medium text-gray-300  bg-gray-900 " variant="link">Products</Button></Link>
            <Link href="#"><Button className="block px-3 py-2 rounded-md text-base font-medium text-gray-300  bg-gray-900 " variant="link">About Us</Button></Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center gap-2 justify-center">
              <Link href="#"><ShoppingCart  /></Link>
              <LoginLoginBtn />
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
        </>
  )
}



export default NavigationBar