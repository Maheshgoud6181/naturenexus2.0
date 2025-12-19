"use client";

import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Leaf, Trophy, Target, Zap, Home } from "lucide-react";

// 🔥 Firebase
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

interface LevelData {
  score: number;
  time: number;
}

export default function ResultsPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [rank, setRank] = useState<number | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [scoreData, setScoreData] = useState<any>(null);

  useEffect(() => {
    const uid = localStorage.getItem("uid");
    if (!uid) {
      router.push("/register");
      return;
    }

    const loadResults = async () => {
      console.log("User loaded");
      try {
        // 1️⃣ Fetch user
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        console.log("Scores loaded");

        if (!userSnap.exists()) {
          console.log("User updated");
          router.push("/register");
          return;
        }

        const user = userSnap.data();
        setUserData(user);

        // 2️⃣ Fetch scores
        const scoreRef = doc(db, "scores", uid);
        const scoreSnap = await getDoc(scoreRef);

        if (!scoreSnap.exists()) {
          console.log("User loaded");
          router.push("/");
          return;
        }

        const scores = scoreSnap.data();
        setScoreData(scores);

        // 3️⃣ Mark quiz completed
        await updateDoc(userRef, {
          quizCompleted: true,
        });

        // 4️⃣ Push to leaderboard
        await setDoc(doc(db, "leaderboard", uid), {
          fullName: user.fullName,
          rollNumber: user.rollNumber,
          totalScore: scores.totalScore,
          totalTime: scores.totalTime,
          submittedAt: serverTimestamp(),
        });
        console.log("Leaderboard written");

        // 5️⃣ Calculate rank
        const leaderboardQuery = query(
          collection(db, "leaderboard"),
          orderBy("totalScore", "desc"),
          orderBy("totalTime", "asc")
        );
        console.log("Leaderboard written");

        const leaderboardSnap = await getDocs(leaderboardQuery);
        const list = leaderboardSnap.docs.map((d) => d.id);
        setRank(list.indexOf(uid) + 1);
        console.log("Leaderboard written");

        setLoading(false);
      } catch (err) {
        console.error("Results error:", err);
        alert("Unable to load results");
        console.log("Leaderboard fetched");
      }
    };

    loadResults();
  }, [router]);

  useEffect(() => {
    if (!loading && userData && scoreData) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0 },
        colors: ["#22c55e", "#16a34a", "#4ade80", "#86efac", "#bbf7d0"],
      });

      const duration = 3000;
      const end = Date.now() + duration;

      const interval = setInterval(() => {
        if (Date.now() > end) {
          clearInterval(interval);
          return;
        }

        confetti({
          particleCount: 8,
          startVelocity: 0,
          spread: 360,
          ticks: 200,
          gravity: 0.8,
          origin: {
            x: Math.random(),
            y: 0,
          },
          colors: ["#22c55e", "#16a34a", "#4ade80"],
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [loading, userData, scoreData]);

  if (loading || !userData || !scoreData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading results...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary mb-4">
            <Leaf className="h-4 w-4" />
            NATURE NEXUS 2.0
          </div>
          <h1 className="text-4xl font-bold">Quiz Complete 🎉</h1>
          <p className="text-muted-foreground mt-2">
            Well done, {userData.fullName}
          </p>
        </div>

        {/* Rank */}
        <Card className="mb-6 text-center border-2">
          <CardContent className="p-8">
            <Trophy className="mx-auto h-14 w-14 text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bold">Rank #{rank}</h2>
          </CardContent>
        </Card>

        {/* Scores */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <ScoreCard
            icon={<Target />}
            label="Total Score"
            value={scoreData.totalScore}
          />
          <ScoreCard
            icon={<Zap />}
            label="Total Time"
            value={`${scoreData.totalTime}s`}
          />
          <ScoreCard
            icon={<Trophy />}
            label="Final Score"
            value={scoreData.totalScore}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link href="/leaderboard" className="flex-1">
            <Button className="w-full">
              <Trophy className="mr-2 h-5 w-5" />
              View Leaderboard
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-5 w-5" />
              Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

// ----------- Helper ----------
function ScoreCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: any;
}) {
  return (
    <Card className="border-2 text-center">
      <CardContent className="p-6">
        <div className="flex justify-center mb-3 text-primary">{icon}</div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
