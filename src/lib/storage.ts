import type { CuppingSession } from "./types"

const STORAGE_KEY = "cupping-sessions"

export function getAllSessions(): CuppingSession[] {
  if (typeof window === "undefined") return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data) as CuppingSession[]
  } catch {
    return []
  }
}

export function getSession(id: string): CuppingSession | null {
  const sessions = getAllSessions()
  return sessions.find((s) => s.id === id) || null
}

export function saveSession(session: CuppingSession): void {
  if (typeof window === "undefined") return
  try {
    const sessions = getAllSessions()
    const existingIndex = sessions.findIndex((s) => s.id === session.id)
    if (existingIndex >= 0) {
      sessions[existingIndex] = { ...session, timestamp: Date.now() }
    } else {
      sessions.push(session)
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch (e) {
    console.error("Failed to save session:", e)
  }
}

export function deleteSession(id: string): void {
  if (typeof window === "undefined") return
  try {
    const sessions = getAllSessions().filter((s) => s.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions))
  } catch (e) {
    console.error("Failed to delete session:", e)
  }
}

export function getSessionCount(): number {
  return getAllSessions().length
}
