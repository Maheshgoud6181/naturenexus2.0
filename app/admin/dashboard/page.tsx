"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function AdminDashboard() {
  const router = useRouter();
  const [usersCount, setUsersCount] = useState(0);
  const [scoresCount, setScoresCount] = useState(0);
  const [leaderboardCount, setLeaderboardCount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      router.push("/admin");
    }
  }, [router]);

  const fetchCounts = async () => {
    setUsersCount((await getDocs(collection(db, "users"))).size);
    setScoresCount((await getDocs(collection(db, "scores"))).size);
    setLeaderboardCount((await getDocs(collection(db, "leaderboard"))).size);
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const clearCollection = async (name: string) => {
    if (!confirm(`Delete ALL ${name} data?`)) return;

    const snap = await getDocs(collection(db, name));
    for (const d of snap.docs) {
      await deleteDoc(doc(db, name, d.id));
    }

    alert(`${name} cleared`);
    fetchCounts();
  };

  return (
    <div className="min-h-screen p-10 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <Stat label="Users" value={usersCount} />
        <Stat label="Scores" value={scoresCount} />
        <Stat label="Leaderboard" value={leaderboardCount} />
      </div>

      <div className="flex gap-4">
        <Button onClick={() => clearCollection("users")} variant="destructive">
          Clear Users
        </Button>
        <Button onClick={() => clearCollection("scores")} variant="destructive">
          Clear Scores
        </Button>
        <Button
          onClick={() => clearCollection("leaderboard")}
          variant="destructive"
        >
          Clear Leaderboard
        </Button>
      </div>

      <Button
        variant="outline"
        onClick={() => {
          localStorage.removeItem("isAdmin");
          router.push("/");
        }}
      >
        Logout Admin
      </Button>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
