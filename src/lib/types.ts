export interface CuppingField {
  intensity: string
  description: string
}

export interface AftertasteField {
  duration: string
  description: string
}

export interface MouthfeelField {
  body: string
  texture: string
}

export interface CuppingSample {
  sampleName: string
  dryAroma: CuppingField
  crustAroma: CuppingField
  flavor: CuppingField
  aftertaste: AftertasteField
  acidity: CuppingField
  sweetness: CuppingField
  mouthfeel: MouthfeelField
  overallImpression: string
}

export interface CuppingSession {
  id: string
  timestamp: number
  sampleCount: number
  samples: CuppingSample[]
  name?: string
}

export const FIELD_ORDER = [
  "sampleName",
  "dryAroma",
  "crustAroma",
  "flavor",
  "aftertaste",
  "acidity",
  "sweetness",
  "mouthfeel",
  "overallImpression",
] as const

export type FieldKey = (typeof FIELD_ORDER)[number]

export const FIELD_LABELS: Record<FieldKey, string> = {
  sampleName: "Название образца",
  dryAroma: "Сухой аромат",
  crustAroma: "Аромат корки",
  flavor: "Вкусовой профиль",
  aftertaste: "Послевкусие",
  acidity: "Кислотность",
  sweetness: "Сладость",
  mouthfeel: "Тактильные ощущения",
  overallImpression: "Общее впечатление",
}

export function createEmptySample(index: number): CuppingSample {
  return {
    sampleName: `Образец ${index + 1}`,
    dryAroma: { intensity: "", description: "" },
    crustAroma: { intensity: "", description: "" },
    flavor: { intensity: "", description: "" },
    aftertaste: { duration: "", description: "" },
    acidity: { intensity: "", description: "" },
    sweetness: { intensity: "", description: "" },
    mouthfeel: { body: "", texture: "" },
    overallImpression: "",
  }
}

export function createEmptySession(sampleCount: number, name?: string): CuppingSession {
  return {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    sampleCount,
    samples: Array.from({ length: sampleCount }, (_, i) => createEmptySample(i)),
    name: name || `Сессия ${new Date().toLocaleDateString("ru-RU", { month: "short", day: "numeric" })}`,
  }
}
