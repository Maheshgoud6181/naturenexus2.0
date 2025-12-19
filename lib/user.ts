"use client"

import {
  doc,
  setDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore"

import { db } from "./firebase"
import { anonymousLogin } from "./auth"

export async function createUser(
  fullName: string,
  rollNumber: string,
  phoneNumber: string
): Promise<string> {
 
  const uid = await anonymousLogin()

  
  const rollQuery = query(
    collection(db, "users"),
    where("rollNumber", "==", rollNumber)
  )

  const existing = await getDocs(rollQuery)

  if (!existing.empty) {
    throw new Error("ROLL_ALREADY_EXISTS")
  }

  
  await setDoc(doc(db, "users", uid), {
    fullName,
    rollNumber,
    phoneNumber,
    agreedToRules: false,
    quizStarted: false,
    quizCompleted: false,
    createdAt: serverTimestamp(),
  })

  return uid
}
