"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import LoginAndRegister from "./components";
import { ImagesSlider } from "../components/image-slider";
import { motion } from "framer-motion";


export default function SigninForm() {

    const route = useRouter();

    const images = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
    ]
    return (
            <ImagesSlider className="min-h-screen max-h-fit" images={images}>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -80,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="z-50 flex items-center justify-center flex-col pt-24 pb-24"
                >
                    <LoginAndRegister />
                </motion.div>
            </ImagesSlider>
    );
}
