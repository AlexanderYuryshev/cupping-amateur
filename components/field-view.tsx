"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NavigationControls } from "@/components/navigation-controls"
import type { CuppingSession, CuppingSample } from "@/lib/types"
import { FIELD_ORDER, FIELD_LABELS } from "@/lib/types"

interface FieldViewProps {
  session: CuppingSession
  onUpdateSample: (sampleIndex: number, updates: Partial<CuppingSample>) => void
}

export function FieldView({ session, onUpdateSample }: FieldViewProps) {
  const [fieldIndex, setFieldIndex] = useState(0)
  const currentField = FIELD_ORDER[fieldIndex]

  const renderFieldInputs = (sample: CuppingSample, sampleIndex: number) => {
    switch (currentField) {
      case "sampleName":
        return (
          <Input
            value={sample.sampleName}
            onChange={(e) => onUpdateSample(sampleIndex, { sampleName: e.target.value })}
            placeholder="Название образца"
          />
        )
      case "dryAroma":
      case "crustAroma":
      case "flavor":
      case "acidity":
      case "sweetness":
        return (
          <div className="flex flex-col gap-2">
            <Input
              value={sample[currentField].intensity}
              onChange={(e) =>
                onUpdateSample(sampleIndex, {
                  [currentField]: { ...sample[currentField], intensity: e.target.value },
                })
              }
              placeholder="Интенсивность (1-10)"
            />
            <Textarea
              value={sample[currentField].description}
              onChange={(e) =>
                onUpdateSample(sampleIndex, {
                  [currentField]: { ...sample[currentField], description: e.target.value },
                })
              }
              placeholder="Описание"
              rows={2}
            />
          </div>
        )
      case "aftertaste":
        return (
          <div className="flex flex-col gap-2">
            <Input
              value={sample.aftertaste.duration}
              onChange={(e) =>
                onUpdateSample(sampleIndex, {
                  aftertaste: { ...sample.aftertaste, duration: e.target.value },
                })
              }
              placeholder="Длительность (короткое/среднее/долгое)"
            />
            <Textarea
              value={sample.aftertaste.description}
              onChange={(e) =>
                onUpdateSample(sampleIndex, {
                  aftertaste: { ...sample.aftertaste, description: e.target.value },
                })
              }
              placeholder="Описание"
              rows={2}
            />
          </div>
        )
      case "mouthfeel":
        return (
          <div className="flex flex-col gap-2">
            <Input
              value={sample.mouthfeel.body}
              onChange={(e) =>
                onUpdateSample(sampleIndex, {
                  mouthfeel: { ...sample.mouthfeel, body: e.target.value },
                })
              }
              placeholder="Тело (легкое/среднее/полное)"
            />
            <Input
              value={sample.mouthfeel.texture}
              onChange={(e) =>
                onUpdateSample(sampleIndex, {
                  mouthfeel: { ...sample.mouthfeel, texture: e.target.value },
                })
              }
              placeholder="Текстура"
            />
          </div>
        )
      case "overallImpression":
        return (
          <Textarea
            value={sample.overallImpression}
            onChange={(e) => onUpdateSample(sampleIndex, { overallImpression: e.target.value })}
            placeholder="Общее впечатление"
            rows={3}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <NavigationControls
        currentIndex={fieldIndex}
        totalCount={FIELD_ORDER.length}
        onPrevious={() => setFieldIndex((prev) => prev - 1)}
        onNext={() => setFieldIndex((prev) => prev + 1)}
        label="Поле"
      />

      <div className="text-center">
        <h2 className="text-lg font-semibold">{FIELD_LABELS[currentField]}</h2>
      </div>

      <div className="grid gap-4">
        {session.samples.map((sample, sampleIndex) => (
          <div key={sampleIndex} className="flex flex-col gap-2 rounded-lg border p-4">
            <span className="text-sm font-medium text-muted-foreground">
              Образец {sampleIndex + 1}
            </span>
            {renderFieldInputs(sample, sampleIndex)}
          </div>
        ))}
      </div>
    </div>
  )
}
