"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Leaf, Trophy, Medal, Award, Home } from "lucide-react";

import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface LeaderboardEntry {
  rank: number;
  name: string;
  rollNumber: string;
  totalScore: number;
  totalTime: number;
  isCurrentUser: boolean;
}

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const uid = localStorage.getItem("uid");

        const leaderboardQuery = query(
          collection(db, "leaderboard"),
          orderBy("totalScore", "desc"),
          orderBy("totalTime", "asc")
        );

        const snapshot = await getDocs(leaderboardQuery);

        const data: LeaderboardEntry[] = snapshot.docs.map((doc, index) => {
          const d = doc.data();
          return {
            rank: index + 1,
            name: d.fullName,
            rollNumber: d.rollNumber,
            totalScore: d.totalScore,
            totalTime: d.totalTime,
            isCurrentUser: doc.id === uid,
          };
        });

        setLeaderboardData(data);
      } catch (err) {
        console.error("Leaderboard error:", err);
        alert("Unable to load leaderboard");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1 justify-center">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold">#1</span>
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center gap-1 justify-center">
          <Medal className="h-5 w-5 text-gray-400" />
          <span className="font-semibold">#2</span>
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center gap-1 justify-center">
          <Medal className="h-5 w-5 text-gray-400" />
          <span className="font-semibold">#2</span>
        </div>
      );
    }

    // ✅ Fallback for rank 4+
    return <span className="font-semibold text-muted-foreground">#{rank}</span>;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary mb-4">
            <Leaf className="h-4 w-4" />
            NATURE NEXUS 2.0
          </div>
          <h1 className="text-4xl font-bold">Live Leaderboard</h1>
          <p className="text-muted-foreground">
            Rankings based on score and completion time
          </p>
        </div>

        {/* Table */}
        <Card className="border-2 shadow-lg">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Loading leaderboard…</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="w-20 text-center">Rank</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Roll No.</TableHead>
                    <TableHead className="text-right">Score</TableHead>
                    <TableHead className="text-right">Time (s)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((entry) => (
                    <TableRow
                      key={entry.rollNumber}
                      className={
                        entry.isCurrentUser ? "bg-primary/5 font-semibold" : ""
                      }
                    >
                      <TableCell className="text-center">
                        {getRankIcon(entry.rank)}
                      </TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {entry.rollNumber}
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.totalScore}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {entry.totalTime}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Back */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline" size="lg">
              <Home className="mr-2 h-5 w-5" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
