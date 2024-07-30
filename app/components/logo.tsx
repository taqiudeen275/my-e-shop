import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center sm:gap-3 gap-1 bg-pr text-sm p-1  sm:text-xl rounded-full text-primary" >
    My
    <div className="bg-primary  p-1 text-sm sm:text-xl text-background px-2 sm:pl-4 sm:pr-4 rounded-full">E Shop</div>
   </Link>
  )
}

export default Logo