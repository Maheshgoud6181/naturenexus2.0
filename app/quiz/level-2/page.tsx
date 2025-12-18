"use client"

import { useRouter } from "next/navigation"
import { QuizEngine } from "@/components/quiz-engine"
import { level2Questions } from "@/lib/quiz-data"
import { Leaf } from "lucide-react"

export default function Level2Page() {
  const router = useRouter()

  const handleComplete = (score: number, timeBonus: number) => {
    // TODO: Save Level 2 score and time bonus to Firestore

    // Store locally for now
    const existingScores = JSON.parse(localStorage.getItem("levelScores") || "{}")
    existingScores["level2"] = { score, timeBonus }
    localStorage.setItem("levelScores", JSON.stringify(existingScores))

    // Navigate to Level 3
    router.push("/quiz/level-3")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]" />

      <div className="container relative mx-auto px-4">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
            <Leaf className="h-4 w-4" />
            <span>NATURE NEXUS 2.0</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Level 2: Mini Case Study</h1>
          <p className="mt-2 text-muted-foreground">Analyze environmental scenarios and make informed decisions</p>
        </div>

        <QuizEngine levelNumber={2} questions={level2Questions} timeLimit={900} onComplete={handleComplete} />
      </div>
    </main>
  )
}
