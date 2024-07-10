"use client";

/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import React, {useState} from "react";
import {Triangle} from "lucide-react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image"
import { cn } from "@/lib/utils";
import { LoginUser, RegisterUser } from "../sever/authentication";


export default function LoginAndRegister() {
  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LoginForm />
          </CardContent>
         
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
             Hi there 👋,Please register an account if you are new here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
           <RegisterForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const route = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

            const form = {email, password};
            const response = await LoginUser(form);
            if (!response.token) {
                setError('Oops Login Failed 😔, Please try again');
                setIsLoading(false)
            }else{
                setSuccess('Logged in successfuly, Welcome back 😎')
                setIsLoading(false)
            console.log(response)
                // route.push(`/`);
            } 
       
    };
    return (
        <form className="my-8" onSubmit={handleSubmit}>

        <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input required id="email" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="password ">Password</Label>
            <Input required id="password" placeholder="••••••••" type="password"   value={password} onChange={(e) => setPassword(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="my-4">
            <Label className="text-red-500 ">  {error && <p>{error}</p>}</Label>
            <Label className="text-green-500 ">  {success && <p>{success}</p>}</Label>
        </LabelInputContainer>

        <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
        >   
            {isloading? <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span> :  <span>Login</span>}
            <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
{/* 
            <Link href={"/voter/send-sms"} className="text-center text-blue-600">Not Recieved SMS yet? Click here</Link> <br />
            <Link href={"/"} className="text-center text-blue-600">Go back to the home page</Link> */}
    </form>
    )
}


function RegisterForm() {
    const [username, setUSername] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const route = useRouter();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        
            if (password != passwordConfirm){
                setError('Password not match');
                setIsLoading(false)
            }
            const form = {name, username, email,phone, password, passwordConfirm};
            const response = await RegisterUser(form);
            if (!response.token) {
                setError('Failed to authenticate user');
                setIsLoading(false)
            }else {
                setSuccess('Accounts Registered, Thank you for registering 😊')
                route.push(`/`);
                setIsLoading(false)
            } 
      
    };
    return (
        <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Full Name</Label>
            <Input required id="name" placeholder="Full Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="username">Username</Label>
            <Input required id="username" placeholder="Username" type="text" value={username} onChange={(e) => setUSername(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <Input required id="email" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">Phone Number</Label>
            <Input required id="phone" placeholder="233##########" type="text" maxLength={13} value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="password ">Password</Label>
            <Input required id="password" placeholder="••••••••" type="password"    value={password} onChange={(e) => setPassword(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
            <Label htmlFor="passwordConfirm">Confirm Password</Label>
            <Input required id="passwordConfirm" placeholder="••••••••" type="password"   value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
        </LabelInputContainer>
        <LabelInputContainer className="my-4">
            <Label className="text-red-500 ">  {error && <p>{error}</p>}</Label>
            <Label className="text-green-500 ">  {success && <p>{success}</p>}</Label>
        </LabelInputContainer>

        <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
        >   
            {isloading? <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span> :  <span>Register</span>}
            <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
{/* 
            <Link href={"/voter/send-sms"} className="text-center text-blue-600">Not Recieved SMS yet? Click here</Link> <br />
            <Link href={"/"} className="text-center text-blue-600">Go back to the home page</Link> */}
    </form>
    )
}


const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
