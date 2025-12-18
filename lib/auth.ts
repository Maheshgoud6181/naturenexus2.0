"use client"

import { signInAnonymously } from "firebase/auth"
import { auth } from "./firebase"

export async function anonymousLogin() {
  const result = await signInAnonymously(auth)
  return result.user.uid
}
