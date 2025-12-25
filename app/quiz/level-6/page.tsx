"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Leaf,
  Instagram,
  Facebook,
  CheckCircle2,
  Loader2,
  Info,
} from "lucide-react";

export default function Level6Page() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({
    instagram: false,
    facebook: false,
  });

  const handleComplete = async () => {
    setIsSubmitting(true);

    // Save bonus level completion
    const existingScores = JSON.parse(
      localStorage.getItem("levelScores") || "{}"
    );

    existingScores["level6"] = {
      score: 50,
      timeBonus: 0,
      note: "Social media follow verification will be done during winner evaluation",
    };

    localStorage.setItem("levelScores", JSON.stringify(existingScores));

    // Mark quiz as complete
    localStorage.setItem("quizCompleted", "true");

    // Simulate small delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    router.push("/results");
  };

  const allTasksCompleted = completedTasks.instagram && completedTasks.facebook;

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Leaf className="h-4 w-4" />
              <span>NATURE NEXUS 2.0</span>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Level 6: Bonus Challenge
            </h1>
            <p className="text-muted-foreground">
              Follow us on social media to earn bonus points
            </p>
          </div>

          {/* Instructions */}
          <Card className="mb-6 border-2 shadow-lg">
            <CardContent className="p-8">
              <h2 className="mb-4 text-xl font-semibold">
                Complete These Tasks
              </h2>
              <p className="mb-6 text-muted-foreground">
                Follow our official social media pages to earn{" "}
                <b>50 bonus points</b>.
              </p>

              <div className="space-y-6">
                {/* Instagram */}
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${
                      completedTasks.instagram ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    {completedTasks.instagram ? (
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    ) : (
                      <Instagram className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold">Follow on Instagram</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Follow <b>@prakriti.nitdgp</b> on Instagram
                    </p>
                    <Button
                      variant={completedTasks.instagram ? "outline" : "default"}
                      size="sm"
                      onClick={() => {
                        setCompletedTasks((prev) => ({
                          ...prev,
                          instagram: true,
                        }));
                        window.open(
                          "https://www.instagram.com/prakriti.nitdgp",
                          "_blank"
                        );
                      }}
                    >
                      {completedTasks.instagram ? "Followed" : "Follow Now"}
                    </Button>
                  </div>
                </div>

                {/* Facebook */}
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full ${
                      completedTasks.facebook ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    {completedTasks.facebook ? (
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    ) : (
                      <Facebook className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold">Follow on Facebook</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Follow <b>Prakriti – The Techno Environmental Club</b>
                    </p>
                    <Button
                      variant={completedTasks.facebook ? "outline" : "default"}
                      size="sm"
                      onClick={() => {
                        setCompletedTasks((prev) => ({
                          ...prev,
                          facebook: true,
                        }));
                        window.open(
                          "https://www.facebook.com/share/12LRAGuPKA9",
                          "_blank"
                        );
                      }}
                    >
                      {completedTasks.facebook ? "Followed" : "Follow Now"}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Message */}
          <Card className="mb-6 border border-primary/20 bg-primary/5">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 text-primary" />
                <p className="text-sm text-muted-foreground">
                  <b>Note:</b> Social media follow verification will be
                  conducted during final winner evaluation. Bonus points may be
                  revoked if the participant has not followed the pages.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Button
            onClick={handleComplete}
            disabled={!allTasksCompleted || isSubmitting}
            size="lg"
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Finalizing...
              </>
            ) : (
              "Complete Quiz & View Results"
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
