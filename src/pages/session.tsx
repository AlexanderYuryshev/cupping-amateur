import { useState, useEffect } from "react"
import { useSearchParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CuppingForm } from "@/components/cupping-form"
import { getSession, saveSession } from "@/lib/storage"
import { exportToText } from "@/lib/export"
import type { CuppingSession } from "@/lib/types"
import { ChevronLeft, Download } from "lucide-react"

export default function SessionPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [session, setSession] = useState<CuppingSession | null>(null)

  useEffect(() => {
    const id = searchParams.get("id")
    if (!id) {
      navigate("/", { replace: true })
      return
    }

    const loadedSession = getSession(id)
    if (loadedSession) {
      setSession(loadedSession)
    }
  }, [searchParams, navigate])

  const handleComplete = () => {
    if (session) {
      saveSession(session)
    }
    navigate("/")
  }

  const handleExportText = () => {
    if (session) {
      exportToText([session], `session-${session.id}`)
    }
  }

  if (!session) {
    return (
      <main className="min-h-svh flex flex-col items-center justify-center gap-4 bg-background p-4">
        <p className="text-muted-foreground">Сессия не найдена</p>
        <Button asChild>
          <Link to="/">На главную</Link>
        </Button>
      </main>
    )
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
        <span className="text-sm text-muted-foreground">
          {`Образцов: ${session.sampleCount}`}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportText}>
            <Download className="size-4" />
            <span className="hidden sm:inline">TXT</span>
          </Button>
          <Button size="sm" onClick={handleComplete}>
            Завершить
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl p-4">
        <CuppingForm session={session} onSessionUpdate={setSession} />
      </div>
    </main>
  )
}
