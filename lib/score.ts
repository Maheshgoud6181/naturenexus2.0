"use client"

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"
import { db } from "./firebase"

export async function saveLevelScore(
  uid: string,
  levelNumber: number,
  levelScore: number,
  levelTime: number
) {
  const scoreRef = doc(db, "scores", uid)
  const snap = await getDoc(scoreRef)

  const levelScoreKey = `level${levelNumber}Score`
  const levelTimeKey = `level${levelNumber}Time`

  if (!snap.exists()) {
    await setDoc(scoreRef, {
      [levelScoreKey]: levelScore,
      [levelTimeKey]: levelTime,
      totalScore: levelScore,
      totalTime: levelTime,
      lastUpdated: serverTimestamp(),
    })
  } else {
    const data = snap.data()

    await updateDoc(scoreRef, {
      [levelScoreKey]: levelScore,
      [levelTimeKey]: levelTime,
      totalScore: (data.totalScore || 0) + levelScore,
      totalTime: (data.totalTime || 0) + levelTime,
      lastUpdated: serverTimestamp(),
    })
  }
}
