"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Trophy, Clock, Target, Sparkles, Users } from "lucide-react";
import { db } from "@/lib/firebase";

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.15),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.12),transparent_50%)]"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.08),transparent_70%)]"
          style={{
            transform: `translateY(${scrollY * 0.3}px) scale(${
              1 + scrollY * 0.0002
            })`,
            transition: "transform 0.1s ease-out",
          }}
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute top-20 left-[10%] animate-float"
            style={{ animationDelay: "0s" }}
          >
            <Leaf className="h-8 w-8 text-primary/20" />
          </div>
          <div
            className="absolute top-40 right-[15%] animate-float"
            style={{ animationDelay: "2s" }}
          >
            <Leaf className="h-6 w-6 text-secondary/20" />
          </div>
          <div
            className="absolute top-60 left-[20%] animate-float"
            style={{ animationDelay: "4s" }}
          >
            <Leaf className="h-10 w-10 text-primary/15" />
          </div>
          <div
            className="absolute top-32 right-[25%] animate-float"
            style={{ animationDelay: "1s" }}
          >
            <Leaf className="h-7 w-7 text-secondary/25" />
          </div>
        </div>

        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm animate-fade-in">
              <Leaf className="h-4 w-4 animate-spin-slow" />
              <span>Environmental Quiz Challenge 2025</span>
            </div>

            <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl animate-slide-up">
              ⏰ Quiz Ended! at 9 PM.
            </h1>

            <p
              className="mb-8 text-pretty text-xl text-muted-foreground md:text-2xl animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Test Your Eco-Awareness. Think Fast. Climb the Leaderboard.
            </p>

            <div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              {/* <Link href="/register">
                <Button
                  size="lg"
                  disabled
                  className="h-12 px-8 text-base font-semibold group hover:scale-105 transition-transform"
                >
                  Start Quiz
                  <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </Button>
              </Link> */}
              <Link href="/leaderboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base font-semibold bg-transparent group hover:scale-105 transition-transform"
                >
                  View Leaderboard
                  <Trophy className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center animate-on-scroll">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            About the Challenge
          </h2>
          <p className="text-balance text-lg leading-relaxed text-muted-foreground">
            NATURE NEXUS 2.0 is an exciting environmental quiz competition
            designed to test your knowledge about ecology, sustainability, and
            environmental conservation. Challenge yourself through 6 engaging
            levels and compete with fellow participants to claim the top spot on
            the leaderboard!
          </p>
        </div>
      </section>

      {/* Event Details */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Event Details
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <Card className="border-2 transition-all hover:scale-105 hover:shadow-xl hover:-translate-y-1 duration-300 animate-on-scroll">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3 group-hover:scale-110 transition-transform">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  Duration
                </h3>
                <p className="text-muted-foreground">30 Minutes</p>
              </CardContent>
            </Card>

            <Card
              className="border-2 transition-all hover:scale-105 hover:shadow-xl hover:-translate-y-1 duration-300 animate-on-scroll"
              style={{ animationDelay: "0.1s" }}
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-secondary/10 p-3">
                  <Target className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  Levels
                </h3>
                <p className="text-muted-foreground">6 Challenging Rounds</p>
              </CardContent>
            </Card>

            <Card
              className="border-2 transition-all hover:scale-105 hover:shadow-xl hover:-translate-y-1 duration-300 animate-on-scroll"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-accent/10 p-3">
                  <Users className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  Competition
                </h3>
                <p className="text-muted-foreground">Live Leaderboard</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scoring System */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Scoring System
          </h2>
          <p className="text-lg text-muted-foreground">
            Earn points for correct answers and speed bonuses
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
          <Card className="border-l-4 border-l-primary bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 animate-on-scroll">
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Trophy className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Base Points
                </h3>
              </div>
              <p className="text-muted-foreground">
                Earn points for every correct answer. Different levels have
                different point values based on difficulty.
              </p>
            </CardContent>
          </Card>

          <Card
            className="border-l-4 border-l-secondary bg-card/50 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 animate-on-scroll"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-lg bg-secondary/10 p-2">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  Time Bonus
                </h3>
              </div>
              <p className="text-muted-foreground">
                Complete levels faster to earn time bonus points. Speed and
                accuracy both matter!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quiz Levels */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Quiz Levels
            </h2>
            <p className="text-lg text-muted-foreground">
              Progress through 6 unique challenge formats
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                level: 1,
                title: "Image Based Quiz",
                description: "Identify environmental concepts from images",
                icon: "🌿",
              },
              {
                level: 2,
                title: "Mini Case Study",
                description: "Analyze scenarios and make informed decisions",
                icon: "📚",
              },
              {
                level: 3,
                title: "Match & Sequence",
                description:
                  "Test your logical thinking and pattern recognition",
                icon: "🧩",
              },
              {
                level: 4,
                title: "Rapid Response",
                description: "Quick-fire questions to test your reflexes",
                icon: "⚡",
              },
              {
                level: 5,
                title: "True/False + Explanation",
                description: "Justify your answers with reasoning",
                icon: "✓",
              },
              {
                level: 6,
                title: "Bonus Level",
                description: "Special social media engagement challenge",
                icon: "🎁",
              },
            ].map((level, index) => (
              <Card
                key={level.level}
                className="transition-all hover:scale-105 hover:shadow-xl hover:-translate-y-1 duration-300 animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-3xl">{level.icon}</span>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                      Level {level.level}
                    </div>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-card-foreground">
                    {level.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {level.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rules Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Rules & Guidelines
            </h2>
          </div>

          <Card className="border-2 animate-on-scroll">
            <CardContent className="p-8">
              <ul className="space-y-4">
                {[
                  "Complete registration before starting the quiz",
                  "You have 30 Minutes total to complete all 6 levels",
                  "No back navigation - answers are final once submitted",
                  "Tab switching or page refresh may result in warnings/disqualification",
                  "Points are awarded for correct answers and speed bonuses",
                  "Rankings are determined by total score, time bonus, and completion time",
                  "Level 6 requires social media engagement for bonus points",
                  "All decisions by the organizing committee are final",
                ].map((rule, index) => (
                  <li
                    key={index}
                    className="flex gap-3 animate-slide-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-xs font-semibold text-primary">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center animate-on-scroll">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            QUIZ ENDED , STAY TUNED FOR NEXT EDITION!
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Thank You for Participating! Keep Exploring and Protecting Nature.
          </p>
          {/* <Link href="/register">
            <Button
              size="lg"
              disabled
              className="h-14 px-10 text-lg font-semibold group hover:scale-105 transition-transform"
            >
              Register Now
              <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </Link> */}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <p className="text-lg font-semibold text-foreground">
              Prakriti – The Techno Environmental Club
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 Nature Nexus 2.0. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
