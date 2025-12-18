import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Home } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.08),transparent_50%)]" />

      <div className="container relative mx-auto flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md border-2 shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <Leaf className="h-4 w-4" />
              <span>NATURE NEXUS 2.0</span>
            </div>

            <h1 className="mb-4 text-6xl font-bold text-foreground">404</h1>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">Page Not Found</h2>
            <p className="mb-6 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>

            <Link href="/">
              <Button size="lg">
                <Home className="mr-2 h-5 w-5" />
                Return to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
