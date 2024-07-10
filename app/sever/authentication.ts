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
        console.log(record);
        return record;
    } catch (err: any) {
    console.log(err);

        return err
    }
}

export async function RegisterUser(userdata: UserData) {
  try {
    const newUser = await pb.client.collection('users').create(userdata);
    // const authUser = await pb.authenticate(newUser.email, newUser.password);
    const authUser= await pb.client.collection('users').authWithPassword(newUser.email, newUser.password)
    const { record, token } = authUser;
    record.token = token;
    cookies().set('pb_auth', pb.client.authStore.exportToCookie());
    console.log(authUser);
    return authUser;
  } catch (error:any) {
    console.log(error);
    return error;
  }
}