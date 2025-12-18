"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Lock } from "lucide-react"

interface AntiCheatMonitorProps {
  enabled?: boolean
  maxViolations?: number
  onDisqualify?: () => void
}

export function AntiCheatMonitor({ enabled = true, maxViolations = 3, onDisqualify }: AntiCheatMonitorProps) {
  const [violations, setViolations] = useState(0)
  const [showWarning, setShowWarning] = useState(false)
  const [showDisqualified, setShowDisqualified] = useState(false)
  const [lastViolationType, setLastViolationType] = useState<string>("")

  useEffect(() => {
    if (!enabled) return

    // Detect tab switching
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleViolation("Tab Switch Detected")
      }
    }

    // Detect page refresh attempt
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = "Are you sure you want to leave? Your progress may be lost."
      return e.returnValue
    }

    // Prevent right-click (optional)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    // Prevent common keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault()
        handleViolation("Developer Tools Access Attempt")
      }
      // Prevent Ctrl+Shift+I (DevTools)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault()
        handleViolation("Developer Tools Access Attempt")
      }
      // Prevent Ctrl+U (View Source)
      if (e.ctrlKey && e.key === "u") {
        e.preventDefault()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    window.addEventListener("beforeunload", handleBeforeUnload)
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [enabled])

  const handleViolation = (type: string) => {
    const newViolations = violations + 1
    setViolations(newViolations)
    setLastViolationType(type)

    // TODO: Log violations to Firestore
    console.log(`[v0] Violation detected: ${type} (${newViolations}/${maxViolations})`)

    if (newViolations >= maxViolations) {
      setShowDisqualified(true)
      // TODO: Disqualify user based on violation count in Firestore
      onDisqualify?.()
    } else {
      setShowWarning(true)
    }
  }

  return (
    <>
      {/* Warning Modal */}
      <Dialog open={showWarning} onOpenChange={setShowWarning}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-center">Warning!</DialogTitle>
            <DialogDescription className="text-center">
              {lastViolationType} has been detected.
              <br />
              <br />
              You have <span className="font-semibold text-destructive">{maxViolations - violations}</span> warning
              {maxViolations - violations !== 1 ? "s" : ""} remaining before disqualification.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button onClick={() => setShowWarning(false)} className="w-full">
              I Understand
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Disqualified Modal */}
      <Dialog open={showDisqualified} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <Lock className="h-6 w-6 text-destructive" />
            </div>
            <DialogTitle className="text-center">Quiz Locked</DialogTitle>
            <DialogDescription className="text-center">
              You have been disqualified due to multiple violations of quiz rules.
              <br />
              <br />
              Please contact the organizers if you believe this is an error.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Button variant="destructive" className="w-full" onClick={() => (window.location.href = "/")}>
              Return to Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
