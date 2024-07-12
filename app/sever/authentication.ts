"use server"

import pb from "@/lib/pocketbase_client";
import { cookies } from 'next/headers';

interface UserData {
    name: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    passwordConfirm: string,

}

interface LoginData {
    email: string,
    password: string,

}


export async function LoginUser(logindata: LoginData) {
    try {
        const result = await pb.client.collection('users').authWithPassword(logindata.email, logindata.password);
        const { record, token } = result;
        record.token = token;
        cookies().set('pb_auth', pb.client.authStore.exportToCookie());
        const respond =  {...record, ok: true}
        console.log(respond);
        return respond;

        
    } catch (err: any) {
      console.log(err);

        return err
    }
}

export async function RegisterUser(userdata: UserData) {
  try {
    const newUser = await pb.client.collection('users').create(userdata);
   
    return newUser;
  } catch (error:any) {
    // console.log(error);
    console.log(error.originalError.data);
    return error.originalError.data.data;
  }
}