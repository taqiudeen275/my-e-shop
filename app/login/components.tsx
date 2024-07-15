"use client";

/* eslint-disable react/no-unescaped-entities */
import {
    Card,
    CardContent,
    CardDescription,
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
import React, { useState } from "react";
import { Triangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { RegisterUser } from "../sever/authentication";


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
                            Hello 👋,Welcome Back, login to continue shopping 🛒.
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
        setError('');
        setSuccess('');

        try {
            const form = { email, password };
            const response = await fetch('api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (!response.ok) {
                setError('Failed to authenticate user');
                setIsLoading(false)
            };
            const data = await response.json();
            if (data?.token) {
                setSuccess('Logged in successfuly, Welcome back 😎')
                route.push('/');
                setIsLoading(false)
            } else {
                setError('Sorry 😔,Incorrect username or password');
                setIsLoading(false)
            }
        } catch (err) {
            setError('Sorry 😔,Incorrect username or password');
            setIsLoading(false)
        }


    };
    return (
        <form className="my-8" onSubmit={handleSubmit}>

            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input required id="email" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password ">Password</Label>
                <Input required id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </LabelInputContainer>
            <LabelInputContainer className="my-4">
                <Label className="text-green-500 ">  {success && <p>{success}</p>}</Label>
                <Label className="text-red-500 ">  {error && <p>{error}</p>}</Label>
            </LabelInputContainer>

            <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
            >
                {isloading ? <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span> : <span>Login</span>}
                <BottomGradient />
            </button>

            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
            {/* 
            <Link href={"/voter/send-sms"} className="text-center text-blue-600">Not Recieved SMS yet? Click here</Link> <br />
            <Link href={"/"} className="text-center text-blue-600">Go back to the home page</Link> */}
        </form>
    )
}

interface ResgisterErrorResponse {
    email?: {
        code: string;
        message: string;
    };
    password?: {
        code: string;
        message: string;
    };
    passwordConfirm?: {
        code: string;
        message: string;
    };
    username?: {
        code: string;
        message: string;
    };
}


function RegisterForm() {
    const [username, setUSername] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [loginMsg, setLoginMsg] = useState('');
    const [success, setSuccess] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [password2Error, setPassword2Error] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const route = useRouter();
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setEmailError('');
        setPasswordError('');
        setPassword2Error('');
        setUsernameError('');
        setLoginMsg('');

        try {

            const form = { name, username, email, phone, password, passwordConfirm };
        
                const response = await RegisterUser(form);
                if (!response.id){
                    const resError =  response;
                    if (resError.email) {
                        setEmailError(resError.email.message);
                    }
        
                    if (resError.password) {
                        setPasswordError(resError.password.message);
                    }
        
                    if (resError.username) {
                        setUsernameError(resError.username.message);
                    }
                    if (resError.passwordConfirm) {
                        setPassword2Error(resError.passwordConfirm.message);
                    }
                    setIsLoading(false);
                }else{
                setSuccess('Account Registered successfully 🚀, Loging in now...')

                    const loginForm = {email, password}
                  const loginRes =  await fetch('api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginForm)
                });
                const data = await loginRes.json();
            if (data?.token) {
                setLoginMsg('Logged in successfuly, Welcome 😊')
                route.push('/');
                setIsLoading(false)
            } else {
                setError('Sorry 😔,Sorry something went wrong, please login');
                setIsLoading(false)
            }
                }
                console.log("ERROP",response);
        } catch (error: any) {
          console.log(error);
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
                <Input required id="username" placeholder="Username" type="text" value={username} onChange={(e) => setUSername(e.target.value)} />
                <Label className="text-red-500 ">  {usernameError && <p>{usernameError}</p>}</Label>

            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input required id="email" placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <Label className="text-red-500 ">  {emailError && <p>{emailError}</p>}</Label>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="phone">Phone Number</Label>
                <Input required id="phone" placeholder="233##########" type="text" maxLength={13} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="password ">Password</Label>
                <Input required id="password" placeholder="••••••••" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Label className="text-red-500 ">  {passwordError && <p>{passwordError}</p>}</Label>
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <Input required id="passwordConfirm" placeholder="••••••••" type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                <Label className="text-red-500 ">  {password2Error && <p>{password2Error}</p>}</Label>
            </LabelInputContainer>
            <LabelInputContainer className="my-4">
                <Label className="text-red-500 ">  {error && <p>{error}</p>}</Label>
                <Label className="text-green-500 ">  {success && <p>{success}</p>}</Label>
                <Label className="text-green-500 ">  {loginMsg && <p>{loginMsg}</p>}</Label>
            </LabelInputContainer>

            <button
                className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
            >
                {isloading ? <span className="flex align-center justify-center animate-spin"> <Triangle className="" /> </span> : <span>Register</span>}
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
