import { useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NavigationControlsProps {
  currentIndex: number
  totalCount: number
  onPrevious: () => void
  onNext: () => void
  label: string
}

export function NavigationControls({
  currentIndex,
  totalCount,
  onPrevious,
  onNext,
  label,
}: NavigationControlsProps) {
  const canGoPrevious = currentIndex > 0
  const canGoNext = currentIndex < totalCount - 1

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && canGoPrevious) {
        onPrevious()
      } else if (e.key === "ArrowRight" && canGoNext) {
        onNext()
      }
    },
    [canGoPrevious, canGoNext, onPrevious, onNext]
  )

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        variant="outline"
        size="icon"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label="Предыдущий"
      >
        <ChevronLeft className="size-5" />
      </Button>
      <span className="text-sm font-medium text-muted-foreground">
        {label} {currentIndex + 1} из {totalCount}
      </span>
      <Button
        variant="outline"
        size="icon"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label="Следующий"
      >
        <ChevronRight className="size-5" />
      </Button>
    </div>
  )
}
