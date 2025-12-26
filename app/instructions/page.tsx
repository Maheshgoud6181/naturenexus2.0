"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { Leaf, Clock, AlertTriangle, Trophy, Target, Zap } from "lucide-react";

// Firebase
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function InstructionsPage() {
  const router = useRouter();

  const [participantName, setParticipantName] = useState("");
  const [agreedToRules, setAgreedToRules] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const [canStart, setCanStart] = useState(false);
  const [checkingTime, setCheckingTime] = useState(true);

  // ---------------- LOAD USER ----------------
  useEffect(() => {
    const uid = localStorage.getItem("uid");

    if (!uid) {
      router.push("/register");
      return;
    }

    const fetchUser = async () => {
      try {
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          router.push("/register");
          return;
        }

        const userData = userSnap.data();

        setParticipantName(userData.fullName);

        // Block re-entry if quiz already started
        if (userData.quizStarted && !userData.quizCompleted) {
          router.push("/quiz/level-1");
        }
      } catch (error) {
        console.error("Error loading user:", error);
        router.push("/register");
      }
    };

    fetchUser();
    confetti({
      particleCount: 150,
      spread: 120,
      startVelocity: 40,
      gravity: 1,
      ticks: 300,
      scalar: 1.0,
      shapes: ["square"],
      origin: { y: 0.2 },
      colors: [
        "#ef4444",
        "#f97316",
        "#eab308",
        "#22c55e",
        "#3b82f6",
        "#8b5cf6",
        "#ec4899",
      ],
    });
  }, [router]);

  // ---------------- CHECK EVENT TIME ----------------
  useEffect(() => {
    const checkEventTime = async () => {
      try {
        const eventRef = doc(db, "config", "event");
        const snap = await getDoc(eventRef);

        if (!snap.exists()) {
          setCanStart(false);
          setCheckingTime(false);
          return;
        }

        const { startTime, endTime } = snap.data();
        const now = new Date();

        if (
          now >= startTime.toDate() &&
          (!endTime || now <= endTime.toDate())
        ) {
          setCanStart(true);
        } else {
          setCanStart(false);
        }
      } catch (err) {
        console.error("Event time check failed", err);
        setCanStart(false);
      } finally {
        setCheckingTime(false);
      }
    };

    checkEventTime();
  }, []);

  // ---------------- BEGIN QUIZ ----------------
  const handleBeginQuiz = async () => {
    if (!agreedToRules) return;

    const uid = localStorage.getItem("uid");
    if (!uid) {
      router.push("/register");
      return;
    }

    

    setIsStarting(true);

    try {
      const userRef = doc(db, "users", uid);

      await updateDoc(userRef, {
        agreedToRules: true,
        quizStarted: true,
        quizStartTime: serverTimestamp(),
      });

      router.push("/quiz/level-1");
    } catch (error) {
      console.error("Error starting quiz:", error);
      alert("Unable to start quiz. Please try again.");
    } finally {
      setIsStarting(false);
    }
  };

  // ---------------- UI ----------------
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]" />

      <div className="container relative mx-auto px-4 py-12">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <Leaf className="h-4 w-4" />
              <span>NATURE NEXUS 2.0</span>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Welcome, {participantName}!
            </h1>
            <p className="text-muted-foreground">
              Please read the instructions carefully before starting
            </p>
          </div>

          {/* Quiz Structure */}
          <Card className="mb-6 border-2 shadow-lg">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Quiz Structure</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <InfoItem
                  icon={<Clock />}
                  title="Duration"
                  desc="30 Minutes total for all levels"
                />
                <InfoItem
                  icon={<Target />}
                  title="6 Levels"
                  desc="Each with unique challenges"
                />
                <InfoItem
                  icon={<Trophy />}
                  title="Points System"
                  desc="Earn points for correct answers"
                />
                <InfoItem
                  icon={<Zap />}
                  title="Time Bonus"
                  desc="Faster completion = more points"
                />
              </div>
            </CardContent>
          </Card>

          {/* Rules */}
          <Card className="mb-6 border-2 shadow-lg">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Important Rules</h2>
              <ul className="space-y-3">
                {[
                  "You cannot go back to previous questions once submitted",
                  "Tab switching or leaving the page will trigger a warning",
                  "Multiple violations may result in disqualification",
                  "Each level must be completed in sequence",
                  "Rankings depend on score and time",
                ].map((rule, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary font-semibold">{i + 1}.</span>
                    <span className="text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Warning */}
          <Card className="mb-6 border-2 border-destructive/20 bg-destructive/5">
            <CardContent className="p-6 flex gap-3">
              <AlertTriangle className="text-destructive" />
              <p className="text-sm text-muted-foreground">
                Once you click "Begin Level 1", the timer will start. Tab
                switching and refresh are monitored.
              </p>
            </CardContent>
          </Card>

          {/* Agreement */}
          <Card className="mb-6 border-2 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Checkbox
                  id="agree"
                  checked={agreedToRules}
                  onCheckedChange={(v) => setAgreedToRules(v as boolean)}
                />
                <label htmlFor="agree" className="text-sm">
                  I have read and agree to all the rules
                </label>
              </div>

              <Button
                onClick={handleBeginQuiz}
                disabled={!agreedToRules || isStarting}
                className="w-full"
                size="lg"
              >
                {isStarting ? "Starting..." : "Begin Level 1 →"}
              </Button>
              {/* {checkingTime ? (
                <p className="text-center text-muted-foreground">
                  Checking event start time…
                </p>
              ) : canStart ? (
                <Button
                  onClick={handleBeginQuiz}
                  disabled={!agreedToRules || isStarting}
                  className="w-full"
                  size="lg"
                >
                  {isStarting ? "Starting…" : "Begin Level 1 →"}
                </Button>
              ) : (
                <p className="text-center text-red-500 font-medium">
                  ⏳ Quiz will start at the scheduled time
                </p>
              )} */}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

// ---------------- HELPER ----------------
function InfoItem({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-primary/10 p-2 text-primary">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
    </div>
  );
}
