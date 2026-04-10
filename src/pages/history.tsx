import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { SessionHistory } from "@/components/session-history"
import { getAllSessions } from "@/lib/storage"
import { exportToText } from "@/lib/export"
import type { CuppingSession } from "@/lib/types"
import { ChevronLeft, Download } from "lucide-react"

export default function HistoryPage() {
  const [sessions, setSessions] = useState<CuppingSession[]>([])

  useEffect(() => {
    const loadedSessions = getAllSessions().sort(
      (a, b) => b.timestamp - a.timestamp,
    )
    setSessions(loadedSessions)
  }, [])

  const handleDelete = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id))
  }

  const handleExportText = () => {
    exportToText(sessions)
  }

  return (
    <main className="min-h-svh bg-background">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-4 py-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ChevronLeft className="size-4" />
            <span>Назад</span>
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">История</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportText}
            disabled={sessions.length === 0}
          >
            <Download className="size-4" />
            <span className="hidden sm:inline">TXT</span>
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl p-4">
        <SessionHistory sessions={sessions} onDelete={handleDelete} />
      </div>
    </main>
  )
}
