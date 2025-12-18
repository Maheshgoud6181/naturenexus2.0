"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Leaf, Loader2 } from "lucide-react";

// 🔥 Firebase
import { createUser } from "@/lib/user";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    rollNumber: "",
    phoneNumber: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors = {
      fullName: "",
      rollNumber: "",
      phoneNumber: "",
    };

    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required";
      isValid = false;
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1️⃣ Validate form
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // 2️⃣ Create anonymous auth FIRST
      const uid = await createUser(
        formData.fullName,
        formData.rollNumber,
        formData.phoneNumber
      );

      // 3️⃣ Save UID
      localStorage.setItem("uid", uid);

      // 4️⃣ Navigate
      router.push("/instructions");
    } catch (error: any) {
      console.error("Registration error:", error);

      if (error.message === "ROLL_ALREADY_EXISTS") {
        setErrors((prev) => ({
          ...prev,
          rollNumber: "This roll number is already registered",
        }));
      } else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const isFormValid =
    formData.fullName.trim() &&
    formData.rollNumber.trim() &&
    /^\d{10}$/.test(formData.phoneNumber);

  // ---------------- UI ----------------
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]" />

      <div className="container relative mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <Leaf className="h-4 w-4" />
              <span>NATURE NEXUS 2.0</span>
            </div>
            <h1 className="mb-2 text-3xl font-bold">Registration</h1>
            <p className="text-muted-foreground">
              Fill in your details to begin the quiz
            </p>
          </div>

          {/* Form */}
          <Card className="border-2 shadow-lg">
            <CardHeader>
              <CardTitle>Participant Information</CardTitle>
              <CardDescription>
                All fields are required to continue
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className={errors.fullName ? "border-destructive" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Roll Number */}
                <div className="space-y-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    value={formData.rollNumber}
                    onChange={(e) =>
                      handleInputChange("rollNumber", e.target.value)
                    }
                    placeholder="Enter your roll number"
                    className={errors.rollNumber ? "border-destructive" : ""}
                  />
                  {errors.rollNumber && (
                    <p className="text-sm text-destructive">
                      {errors.rollNumber}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      handleInputChange(
                        "phoneNumber",
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder="Enter 10-digit phone number"
                    className={errors.phoneNumber ? "border-destructive" : ""}
                  />
                  {errors.phoneNumber && (
                    <p className="text-sm text-destructive">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Continue to Instructions"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Back */}
          <div className="mt-6 text-center">
            <Button
              variant="link"
              onClick={() => router.push("/")}
              className="text-muted-foreground"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
