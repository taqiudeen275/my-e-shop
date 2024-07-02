/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'


const NavBar = () => {

   const {status,data:session} = useSession();

   const handlesGoogeSigning = ()=>{
    signIn('google', {callbackUrl:"http://localhost:3000/"})
  }
  const handlesGoogeSignOut = ()=>{
    signOut()
  }

  return (
    <div className='flex gap-4 p-4 align-middle justify-center h-[80px] '>
        <Link href='/'>home</Link>
        {status ==='loading' && <div>Loading...</div>}
        {status === 'authenticated' && <div className='flex gap-2 justify-center'>
            {/* <img className='h-[30px] rounded-2xl' src={session.user!.image} alt={session.user!.name} /> */}
             {session.user!.name}
             <button onClick={handlesGoogeSignOut} className=' bg-red-500 p-1 rounded-sm text-white w-[70px]' >Signout</button>
             </div>}
        {status === 'unauthenticated' && <button onClick={handlesGoogeSigning} className='btn bg-slate-300-500 shadow-lg p-3 rounded-sm '>Signin with google</button>}
         
         
    </div>
  )
}

export default NavBar