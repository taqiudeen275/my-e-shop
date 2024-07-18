"use server"

import pb from "@/lib/pocketbase_client"
import { cookies } from "next/headers"


async function setupAuth() {
    const cookieStore = cookies()
    const authCookie = cookieStore.get('pb_auth')
    if (authCookie) {
      pb.client.authStore.loadFromCookie(authCookie.value)
    }
  } 

  