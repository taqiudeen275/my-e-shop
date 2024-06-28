import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import CridentialProvider from 'next-auth/providers/credentials'
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt'

export const authOptions: NextAuthOptions =  {
    // adapter: PrismaAdapter(prisma),
    providers: [
      CridentialProvider({
        name: 'Credentials',
        credentials: {
          email: {label: 'Email', type: "Email", placeholder: 'Email'},
          password: {label: 'Password', type: "Password", placeholder: 'Password'}
        },
        async authorize(credentials, req) {
          if (!credentials?.email || !credentials?.password)  return null;
          const user = await prisma.user.findUnique({ where: { email: credentials.email}})
          
          if (!user) return null;

          const passMatched = await bcrypt.compare(credentials.password, user.password!)

          return passMatched ? user: null;
        },
      }),
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
      ],
      session:{
        strategy: 'jwt'
      }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST,}