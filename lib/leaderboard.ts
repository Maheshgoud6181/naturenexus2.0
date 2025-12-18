"use client"

import {
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"
import { db } from "./firebase"

export function listenLeaderboard(setLeaderboard: any) {
  const q = query(
    collection(db, "leaderboard"),
    orderBy("totalScore", "desc"),
    orderBy("totalTime", "asc")
  )

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    setLeaderboard(data)
  })
}
