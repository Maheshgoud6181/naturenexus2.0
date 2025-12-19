"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Leaf,
  Upload,
  Instagram,
  Facebook,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function Level6Page() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [completedTasks, setCompletedTasks] = useState({
    instagram: false,
    facebook: false,
    screenshot: false,
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setCompletedTasks((prev) => ({ ...prev, screenshot: true }));
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    // TODO: Upload screenshot to Firebase Storage
    // TODO: Save proof URL to Firestore
    // TODO: Award bonus points for completion

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Save bonus level completion
    const existingScores = JSON.parse(
      localStorage.getItem("levelScores") || "{}"
    );
    existingScores["level6"] = { score: 50, timeBonus: 10 }; // Bonus points
    localStorage.setItem("levelScores", JSON.stringify(existingScores));

    // Mark quiz as complete
    localStorage.setItem("quizCompleted", "true");

    setIsUploading(false);

    // Navigate to results
    router.push("/results");
  };

  const allTasksCompleted =
    completedTasks.instagram &&
    completedTasks.facebook &&
    completedTasks.screenshot;

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <Leaf className="h-4 w-4" />
              <span>NATURE NEXUS 2.0</span>
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground">
              Level 6: Bonus Challenge
            </h1>
            <p className="text-muted-foreground">
              Complete social media tasks for bonus points
            </p>
          </div>

          {/* Instructions Card */}
          <Card className="mb-6 border-2 shadow-lg">
            <CardContent className="p-8">
              <h2 className="mb-4 text-xl font-semibold text-foreground">
                Complete These Tasks
              </h2>
              <p className="mb-6 text-muted-foreground">
                Follow our social media accounts and upload a screenshot to earn
                50 bonus points!
              </p>

              <div className="space-y-6">
                {/* Instagram Task */}
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
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
                    <h3 className="mb-1 font-semibold text-card-foreground">
                      Follow on Instagram
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Follow @prakriti_environmental on Instagram
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
                          "https://www.instagram.com/prakriti.nitdgp?igsh=ZWdkZ2t5OXc0am41",
                          "_blank"
                        );
                      }}
                    >
                      {completedTasks.instagram ? "Followed" : "Follow Now"}
                    </Button>
                  </div>
                </div>

                {/* Facebook Task */}
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
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
                    <h3 className="mb-1 font-semibold text-card-foreground">
                      Follow on Facebook
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Follow @prakriti_environmental on Facebook
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
                          "https://www.facebook.com/share/12LRAGuPKA9/?mibextid=wwXIfr",
                          "_blank"
                        );
                      }}
                    >
                      {completedTasks.facebook ? "Liked" : "Like Now"}
                    </Button>
                  </div>
                </div>

                {/* Screenshot Upload */}
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      completedTasks.screenshot ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    {completedTasks.screenshot ? (
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    ) : (
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 font-semibold text-card-foreground">
                      Upload Screenshot
                    </h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Upload any one screenshot showing account followed
                    </p>
                    <div className="space-y-3">
                      <Label htmlFor="screenshot" className="sr-only">
                        Upload Screenshot
                      </Label>
                      <Input
                        id="screenshot"
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="cursor-pointer"
                      />
                      {previewUrl && (
                        <div className="overflow-hidden rounded-lg border-2 border-primary/20">
                          <img
                            src={previewUrl || "/placeholder.svg"}
                            alt="Screenshot preview"
                            className="w-full"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bonus Points Info */}
          <Card className="mb-6 border-2 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">
                    Bonus Reward
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete all tasks to earn 50 bonus points!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!allTasksCompleted || isUploading}
            className="w-full"
            size="lg"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Uploading Screenshot...
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
