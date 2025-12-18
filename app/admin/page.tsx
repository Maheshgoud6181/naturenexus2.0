"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ADMIN_KEY } from "@/lib/admin";

export default function AdminLogin() {
  const [key, setKey] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (key === ADMIN_KEY) {
      localStorage.setItem("isAdmin", "true");
      router.push("/admin/dashboard");
    } else {
      alert("Invalid admin key");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-96">
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-bold text-center">Admin Login</h2>
          <Input
            placeholder="Enter admin key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <Button className="w-full" onClick={handleLogin}>
            Enter Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
