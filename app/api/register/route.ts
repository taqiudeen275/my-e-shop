import pb from '@/lib/pocketbase_client';
import { cookies } from 'next/headers';
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { name,username, email, phone, password, passwordConfirm } = await request.json();
        
         const newUser = await pb.client.collection('users').create({ name,username, email, phone, password, passwordConfirm });
        
        return NextResponse.json(newUser);
    } catch (err: any) {
        return new Response(
            JSON.stringify({ error: err.originalError.data.data }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }
}