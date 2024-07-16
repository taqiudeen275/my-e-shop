"use client";

import React from "react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Logout } from "iconsax-react";
import pb from "@/lib/pocketbase_client";
import { useCookies } from "next-client-cookies";
import { AuthModel } from "pocketbase";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProps {
    addresses: string,
    avatar: string,
    collectionId: string,
    collectionName: string,
    created: string,
    email: string,
    emailVisibility: boolean,
    id: string,
    name: string,
    phone: number,
    updated: string,
    username: string,
    verified: boolean,
    token: string,
  }

const LoginLoginBtn = () => {
  const cookies = useCookies();
  const router = useRouter();
  const path = usePathname()
    const [user, setUser] = useState<AuthModel|null>();
    const [isLogin, setIslogin] = useState(false);
    const [currentpath, setPath] = useState("");
    
    useEffect(() => {
      // setPath(path)
      setPbCookie()
   
      function setPbCookie() {
    pb.client.authStore.loadFromCookie(cookies.get('pb_auth')?? "") 
    setIslogin(pb.client.authStore.isValid)
    setUser(pb.client.authStore.model);
    }
      
  }, [cookies, path]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    
    const handleLogout = async () => {
        try {
            await pb.logoutUser();
            router.push('/login');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };
  return (
    <div className='flex items-center'>
        {isLogin && <p> <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>PC</AvatarFallback>
    </Avatar></p>}
        {isLogin ?  <Button variant="ghost" className="mx-1" onClick={handleLogout}><Logout/></Button>
                :<Link href="/login" ><Button>Login</Button></Link>}
    </div>
  )
}

export default LoginLoginBtn