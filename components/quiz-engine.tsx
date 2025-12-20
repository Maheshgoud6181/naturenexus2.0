"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, ChevronRight, Loader2 } from "lucide-react";
import { AntiCheatMonitor } from "@/components/anti-cheat-monitor";

// 🔥 Firebase
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { saveLevelScore } from "@/lib/score";

// ---------------- TYPES ----------------

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number | number[];
  points: number;
  imageUrl?: string;
}

interface QuizEngineProps {
  levelNumber: number;
  questions: QuizQuestion[];
  timeLimit: number; // seconds
  onComplete: (score: number, timeTaken: number) => void;
  children?: (props: QuizEngineRenderProps) => React.ReactNode;
}

export interface QuizEngineRenderProps {
  currentQuestion: QuizQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  selectedAnswer: number | number[] | null;
  onSelectAnswer: (answer: number | number[]) => void;
  onSubmitAnswer: () => void;
  timeRemaining: number;
  isAnswerSubmitted: boolean;
  score: number;
}

// ---------------- ENGINE ----------------

export function QuizEngine({
  levelNumber,
  questions,
  timeLimit,
  onComplete,
  children,
}: QuizEngineProps) {
  const uid =
    typeof window !== "undefined" ? localStorage.getItem("uid") : null;

  const isRapidRound = levelNumber === 4;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<
    number | number[] | null
  >(null);
  const [score, setScore] = useState(0);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  // ⬆️ Auto scroll to top when question changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentQuestionIndex]);

  // ⏱ GLOBAL QUIZ TIMER (normal rounds)
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);

  // ⚡ RAPID ROUND TIMER (local only)
  const [rapidStartTime] = useState<number | null>(
    isRapidRound ? Date.now() : null
  );

  const [timeRemaining, setTimeRemaining] = useState(timeLimit);

  // 🔒 Guard access
  useEffect(() => {
    if (!uid) {
      window.location.href = "/register";
    }
  }, [uid]);

  // 🔥 Load global quiz start time (for non-rapid rounds)
  useEffect(() => {
    if (isRapidRound) return;

    const loadStartTime = async () => {
      if (!uid) return;

      const snap = await getDoc(doc(db, "users", uid));
      if (!snap.exists()) return;

      const data = snap.data();
      if (data.quizStartTime) {
        setQuizStartTime(data.quizStartTime.toMillis());
      }
    };

    loadStartTime();
  }, [uid, isRapidRound]);

  // ⏱ Calculate remaining time
  const getRemainingTime = () => {
    // ⚡ RAPID ROUND (custom timer)
    if (isRapidRound && rapidStartTime) {
      const elapsed = Math.floor((Date.now() - rapidStartTime) / 1000);
      return Math.max(timeLimit - elapsed, 0);
    }

    // ⏳ NORMAL ROUNDS (global timer)
    if (!quizStartTime) return timeLimit;

    const elapsed = Math.floor((Date.now() - quizStartTime) / 1000);
    return Math.max(timeLimit - elapsed, 0);
  };

  // ⏲ Timer loop
  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getRemainingTime();
      setTimeRemaining(remaining);

      if (remaining === 0) {
        clearInterval(timer);
        handleAutoSubmit();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStartTime, rapidStartTime]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  // ✅ Check answer
  const checkAnswer = () => {
    if (selectedAnswer === null) return false;

    const correct = currentQuestion.correctAnswer;

    if (Array.isArray(correct)) {
      if (!Array.isArray(selectedAnswer)) return false;
      return (
        correct.length === selectedAnswer.length &&
        correct.every((v) => selectedAnswer.includes(v))
      );
    }

    return selectedAnswer === correct;
  };

  // 📨 Submit answer
  const handleSubmitAnswer = async () => {
    const isCorrect = checkAnswer();
    const earned = isCorrect ? currentQuestion.points : 0;

    if (isCorrect) setScore((prev) => prev + earned);

    setIsAnswerSubmitted(true);

    setTimeout(async () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsAnswerSubmitted(false);
      } else {
        const finalScore = score + earned;
        const timeTaken = timeLimit - timeRemaining;

        if (uid) {
          await saveLevelScore(uid, levelNumber, finalScore, timeTaken);
        }

        onComplete(finalScore, timeTaken);
      }
    }, 1000);
  };

  // ⛔ Auto submit on timeout
  const handleAutoSubmit = async () => {
    const timeTaken = timeLimit - timeRemaining;

    if (uid) {
      await saveLevelScore(uid, levelNumber, score, timeTaken);
    }

    onComplete(score, timeTaken);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const renderProps: QuizEngineRenderProps = {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: questions.length,
    selectedAnswer,
    onSelectAnswer: setSelectedAnswer,
    onSubmitAnswer: handleSubmitAnswer,
    timeRemaining,
    isAnswerSubmitted,
    score,
  };

  return (
    <>
      <AntiCheatMonitor
        enabled
        maxViolations={3}
        onDisqualify={() => (window.location.href = "/")}
      />

      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <div className="mb-4 flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                Level {levelNumber}
                {isRapidRound && " ⚡ Rapid"}
              </h2>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-card px-4 py-2 shadow">
              <Clock className="h-5 w-5" />
              <span className="text-lg font-semibold">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {children ? (
          children(renderProps)
        ) : (
          <DefaultQuestionRenderer {...renderProps} levelNumber={levelNumber} />
        )}
      </div>
    </>
  );
}

// ---------------- DEFAULT RENDERER ----------------

function DefaultQuestionRenderer({
  currentQuestion,
  selectedAnswer,
  onSelectAnswer,
  onSubmitAnswer,
  isAnswerSubmitted,
  currentQuestionIndex,
  levelNumber,
}: QuizEngineRenderProps & { levelNumber: number }) {
  return (
    <Card className="border-2 shadow-lg">
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            Level {levelNumber} – Question {currentQuestionIndex + 1}
          </div>

          <h3 className="mb-4 text-xl font-semibold">
            {currentQuestion.question}
          </h3>

          {currentQuestion.imageUrl && (
            <img
              src={currentQuestion.imageUrl}
              alt="question"
              className="mb-6 w-full rounded-lg"
            />
          )}
        </div>

        <div className="mb-6 space-y-3">
          {currentQuestion.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => !isAnswerSubmitted && onSelectAnswer(idx)}
              disabled={isAnswerSubmitted}
              className={`w-full rounded-lg border-2 p-4 text-left ${
                selectedAnswer === idx
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <Button
          onClick={onSubmitAnswer}
          disabled={selectedAnswer === null || isAnswerSubmitted}
          className="w-full flex items-center justify-center gap-2"
          size="lg"
        >
          {isAnswerSubmitted ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Submit Answer
              <ChevronRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
