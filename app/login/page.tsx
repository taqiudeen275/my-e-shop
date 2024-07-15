"use client";
import React, {useState} from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Triangle} from "lucide-react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import Image from "next/image"
import { cn } from "@/lib/utils";
import LoginAndRegister from "./components";


export default function SigninForm() {

    const route = useRouter();


    return (
        <div className="flex items-center justify-center flex-col mt-14">
            <LoginAndRegister />            
        </div>
    );
}
