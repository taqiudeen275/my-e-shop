import Link from 'next/link'
import React from 'react'
import Logo from './logo'
import { Facebook, Instagram, Whatsapp, Youtube } from 'iconsax-react'
import { X } from 'lucide-react'

const Footer = () => {
  return (
    <div className='w-screen min-h-[40vh] max-h-fit border-purple-400/50 border-t px-4 md:px-24 py-4 sm:pt-8'>
      <div className='flex flex-wrap w-full flex-col sm:flex-row justify-between gap-5 h-full'>
        <div className=''>
          <Logo />
        </div>
        <div>
          <h1 className='text-xl font-bold mb-5'>Useful Links</h1>
          <ul className='space-y-3'>
            <li><Link href={"#"} className='hover:text-primary transition-colors'>Products</Link></li>
            <li><Link href={"#"} className='hover:text-primary transition-colors'>About Us</Link></li>
            <li><Link href={"#"} className='hover:text-primary transition-colors'>Terms and Conditions</Link></li>
          </ul>
        </div>
        <div>
          <h1 className='text-xl font-bold mb-5'>Other Links</h1>
          <ul className='space-y-3'>
            <li><Link href={"#"} className='hover:text-primary transition-colors'>Blog</Link></li>
            <li><Link href={"#"} className='hover:text-primary transition-colors'>Promotion</Link></li>
            <li><Link href={"#"} className='hover:text-primary transition-colors'>Testimonies</Link></li>
          </ul>
        </div>
        <div>
          <h1 className='text-xl font-bold mb-5'>Useful Links</h1>
          <div className='flex gap-3'>
          <Link href={"#"} className='hover:text-primary transition-colors'><Facebook /></Link>
          <Link href={"#"} className='hover:text-primary transition-colors'><Whatsapp /></Link>
          <Link href={"#"} className='hover:text-primary transition-colors'><Instagram /></Link>
          <Link href={"#"} className='hover:text-primary transition-colors'><X /></Link>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent  my-8 h-[1px] w-full" />
      <div className='text-center'>
        <div>© 2024  | <Link href={"#"} className='text-primary underline' >Privacy & Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer