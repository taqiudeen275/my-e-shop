/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'


const NavBar = () => {

   const {status,data:session} = useSession();

   const handlesGoogeSigning = ()=>{
    signIn('google', {callbackUrl:"http://localhost:3000/"})
  }

  return (
    <div className='flex gap-4 p-4  '>
        <Link href='/'>home</Link>
        {status ==='loading' && <div>Loading...</div>}
        {status === 'authenticated' && <div className='flex gap-2 justify-center'>
            {/* <img className='h-[30px] rounded-2xl' src={session.user!.image} alt={session.user!.name} /> */}
             {session.user!.name}
             <Link href='/api/auth/signout'>Logout</Link>
             </div>}
        {status === 'unauthenticated' && <button onClick={handlesGoogeSigning}>Signin</button>}
         
         
    </div>
  )
}

export default NavBar