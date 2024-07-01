
"use server"


import { authOptions } from '@/lib/authOption';
import { getServerSession } from "next-auth"
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";
import { LoginSchema } from './z';

export async function Login(formData: FormData) {
    const session = await getServerSession(authOptions);
   const email = formData.get('email');
   const password = formData.get('password');
   
   const validation = LoginSchema.safeParse(formData);

   if (!validation.success) {
    const error = validation.error.errors
    return {error , status: 400}
}
   const user = await prisma.user.findUnique({
    where: {email: email as string,}
})

   const passMatched = await bcrypt.compare(password as string, user?.password as string)
    
   return  passMatched ? user: null;
}


export async function  RegisterUser(prevState: any, formData: FormData){
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const phone = formData.get('email');
    
    const validation = LoginSchema.safeParse(formData);

    if (!validation.success) {
        const error = validation.error.errors
        return {error , status: 400}
    }

    const user = await prisma.user.findUnique({
        where: {email:  email as string}
    })

    if (user) {
        return {error: 'User Already Exist', status: 400}   
    }

    const hashedpass = bcrypt.hash(password as string, 10);

    const newUser = await prisma.user.create({
       data:{
        firstName: firstName as string,
        lastName: lastName as string,
        email: email as string,
        password: password as string,
        phone: phone as string
    }
    })
    return {'NewUser': newUser.firstName, status: 201}

}