"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SessionSetup } from "@/components/session-setup"
import { getSessionCount } from "@/lib/storage"

export default function HomePage() {
  const [showSetup, setShowSetup] = useState(false)
  const [sessionCount, setSessionCount] = useState(0)

  useEffect(() => {
    setSessionCount(getSessionCount())
  }, [])

  return (
    <main className="min-h-svh flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Каппинг кофе</CardTitle>
          <CardDescription>
            {sessionCount > 0
              ? `Записано сессий: ${sessionCount}`
              : "Начните вашу первую сессию каппинга"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showSetup ? (
            <SessionSetup onCancel={() => setShowSetup(false)} />
          ) : (
            <div className="flex flex-col gap-3">
              <Button onClick={() => setShowSetup(true)} size="lg" className="w-full">
                Новая сессия
              </Button>
              {sessionCount > 0 && (
                <Button variant="outline" size="lg" className="w-full" asChild>
                  <Link href="/history">История</Link>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}
