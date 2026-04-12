import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteSession } from "@/lib/storage"
import type { CuppingSession } from "@/lib/types"
import { Trash2 } from "lucide-react"

interface SessionHistoryProps {
  sessions: CuppingSession[]
  onDelete: (id: string) => void
}

export function SessionHistory({ sessions, onDelete }: SessionHistoryProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getSampleWord = (count: number) => {
    if (count === 1) return "образец"
    if (count >= 2 && count <= 4) return "образца"
    return "образцов"
  }

  const handleDelete = () => {
    if (deleteId) {
      deleteSession(deleteId)
      onDelete(deleteId)
      setDeleteId(null)
    }
  }

  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
        <p className="text-muted-foreground">Пока нет записанных сессий</p>
        <Button asChild>
          <Link to="/">Начать сессию</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {sessions.map((session) => (
        <div
          key={session.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <Link to={`/session?id=${session.id}`} className="flex-1">
            <div className="flex flex-col gap-1">
              <span className="font-medium">
                {session.name || `${session.sampleCount} ${getSampleWord(session.sampleCount)}`}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatDate(session.timestamp)} в {formatTime(session.timestamp)}
              </span>
            </div>
          </Link>

          <AlertDialog open={deleteId === session.id} onOpenChange={(open) => !open && setDeleteId(null)}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.preventDefault()
                  setDeleteId(session.id)
                }}
                aria-label="Удалить сессию"
              >
                <Trash2 className="size-4 text-muted-foreground" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Удалить сессию</AlertDialogTitle>
                <AlertDialogDescription>
                  Вы уверены, что хотите удалить эту сессию? Это действие нельзя отменить.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Удалить</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
    </div>
  )
}
