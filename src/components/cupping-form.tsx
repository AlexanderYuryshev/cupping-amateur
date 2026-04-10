import { useState, useCallback, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FieldView } from "@/components/field-view"
import { SampleView } from "@/components/sample-view"
import { saveSession } from "@/lib/storage"
import type { CuppingSession, CuppingSample } from "@/lib/types"

interface CuppingFormProps {
  session: CuppingSession
  onSessionUpdate: (session: CuppingSession) => void
}

export function CuppingForm({ session, onSessionUpdate }: CuppingFormProps) {
  const [viewMode, setViewMode] = useState<"field" | "sample">("field")
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleUpdateSample = useCallback(
    (sampleIndex: number, updates: Partial<CuppingSample>) => {
      const updatedSamples = [...session.samples]
      updatedSamples[sampleIndex] = { ...updatedSamples[sampleIndex], ...updates }
      const updatedSession = { ...session, samples: updatedSamples }
      onSessionUpdate(updatedSession)
      
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
      saveTimeoutRef.current = setTimeout(() => {
        saveSession(updatedSession)
      }, 500)
    },
    [session, onSessionUpdate]
  )

  return (
    <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "field" | "sample")}>
      <TabsList className="w-full">
        <TabsTrigger value="field" className="flex-1">
          По полям
        </TabsTrigger>
        <TabsTrigger value="sample" className="flex-1">
          По образцам
        </TabsTrigger>
      </TabsList>

      <TabsContent value="field" className="mt-4">
        <FieldView session={session} onUpdateSample={handleUpdateSample} />
      </TabsContent>

      <TabsContent value="sample" className="mt-4">
        <SampleView session={session} onUpdateSample={handleUpdateSample} />
      </TabsContent>
    </Tabs>
  )
}
