import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-3 bg-pr p-1 pl-8 text-xl rounded-full text-primary" >
    My
    <div className="bg-primary  p-1 text-xl text-background pl-4 pr-4 rounded-full">E Shop</div>
   </Link>
  )
}

export default Logo