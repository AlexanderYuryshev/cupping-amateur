import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { NavigationControls } from "@/components/navigation-controls"
import type { CuppingSession, CuppingSample } from "@/lib/types"

interface SampleViewProps {
  session: CuppingSession
  onUpdateSample: (sampleIndex: number, updates: Partial<CuppingSample>) => void
}

export function SampleView({ session, onUpdateSample }: SampleViewProps) {
  const [sampleIndex, setSampleIndex] = useState(0)
  const sample = session.samples[sampleIndex]

  const updateField = (updates: Partial<CuppingSample>) => {
    onUpdateSample(sampleIndex, updates)
  }

  return (
    <div className="flex flex-col gap-6">
      <NavigationControls
        currentIndex={sampleIndex}
        totalCount={session.sampleCount}
        onPrevious={() => setSampleIndex((prev) => prev - 1)}
        onNext={() => setSampleIndex((prev) => prev + 1)}
        label="Образец"
      />

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Название образца</label>
          <Input
            value={sample.sampleName}
            onChange={(e) => updateField({ sampleName: e.target.value })}
            placeholder="Название образца"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Сухой аромат</label>
          <Input
            value={sample.dryAroma.intensity}
            onChange={(e) =>
              updateField({ dryAroma: { ...sample.dryAroma, intensity: e.target.value } })
            }
            placeholder="Интенсивность (1-10)"
          />
          <Textarea
            value={sample.dryAroma.description}
            onChange={(e) =>
              updateField({ dryAroma: { ...sample.dryAroma, description: e.target.value } })
            }
            placeholder="Описание"
            rows={2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Аромат корки</label>
          <Input
            value={sample.crustAroma.intensity}
            onChange={(e) =>
              updateField({ crustAroma: { ...sample.crustAroma, intensity: e.target.value } })
            }
            placeholder="Интенсивность (1-10)"
          />
          <Textarea
            value={sample.crustAroma.description}
            onChange={(e) =>
              updateField({ crustAroma: { ...sample.crustAroma, description: e.target.value } })
            }
            placeholder="Описание"
            rows={2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Вкусовой профиль</label>
          <Input
            value={sample.flavor.intensity}
            onChange={(e) =>
              updateField({ flavor: { ...sample.flavor, intensity: e.target.value } })
            }
            placeholder="Интенсивность (1-10)"
          />
          <Textarea
            value={sample.flavor.description}
            onChange={(e) =>
              updateField({ flavor: { ...sample.flavor, description: e.target.value } })
            }
            placeholder="Описание"
            rows={2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Послевкусие</label>
          <Input
            value={sample.aftertaste.duration}
            onChange={(e) =>
              updateField({ aftertaste: { ...sample.aftertaste, duration: e.target.value } })
            }
            placeholder="Длительность (короткое/среднее/долгое)"
          />
          <Textarea
            value={sample.aftertaste.description}
            onChange={(e) =>
              updateField({ aftertaste: { ...sample.aftertaste, description: e.target.value } })
            }
            placeholder="Описание"
            rows={2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Кислотность</label>
          <Input
            value={sample.acidity.intensity}
            onChange={(e) =>
              updateField({ acidity: { ...sample.acidity, intensity: e.target.value } })
            }
            placeholder="Интенсивность (1-10)"
          />
          <Textarea
            value={sample.acidity.description}
            onChange={(e) =>
              updateField({ acidity: { ...sample.acidity, description: e.target.value } })
            }
            placeholder="Описание"
            rows={2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Сладость</label>
          <Input
            value={sample.sweetness.intensity}
            onChange={(e) =>
              updateField({ sweetness: { ...sample.sweetness, intensity: e.target.value } })
            }
            placeholder="Интенсивность (1-10)"
          />
          <Textarea
            value={sample.sweetness.description}
            onChange={(e) =>
              updateField({ sweetness: { ...sample.sweetness, description: e.target.value } })
            }
            placeholder="Описание"
            rows={2}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Тактильные ощущения</label>
          <Input
            value={sample.mouthfeel.body}
            onChange={(e) =>
              updateField({ mouthfeel: { ...sample.mouthfeel, body: e.target.value } })
            }
            placeholder="Тело (легкое/среднее/полное)"
          />
          <Input
            value={sample.mouthfeel.texture}
            onChange={(e) =>
              updateField({ mouthfeel: { ...sample.mouthfeel, texture: e.target.value } })
            }
            placeholder="Текстура"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Общее впечатление</label>
          <Textarea
            value={sample.overallImpression}
            onChange={(e) => updateField({ overallImpression: e.target.value })}
            placeholder="Общее впечатление"
            rows={3}
          />
        </div>
      </div>
    </div>
  )
}
