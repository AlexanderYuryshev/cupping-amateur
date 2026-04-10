import type { CuppingSession } from "./types";

export function exportToText(sessions: CuppingSession[], filename?: string) {
  if (sessions.length === 0) return;

  let text = "=== СЕССИИ КАППИНГА КОФЕ ===\n\n";

  sessions.forEach((session, sessionIndex) => {
    const date = new Date(session.timestamp).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const time = new Date(session.timestamp).toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });

    text += `СЕССИЯ ${sessionIndex + 1}\n`;
    text += `Дата: ${date}\n`;
    text += `Время: ${time}\n`;
    text += `Количество образцов: ${session.sampleCount}\n`;
    text += `ID: ${session.id}\n`;
    text += "\n" + "=".repeat(50) + "\n\n";

    session.samples.forEach((sample, sampleIndex) => {
      text += `ОБРАЗЕЦ ${sampleIndex + 1}: ${sample.sampleName || "Без названия"}\n`;
      text += "-".repeat(30) + "\n";

      text += `Сухой аромат: ${sample.dryAroma.intensity || "0"}/10`;
      if (sample.dryAroma.description) {
        text += ` - ${sample.dryAroma.description}`;
      }
      text += "\n";

      text += `Аромат корки: ${sample.crustAroma.intensity || "0"}/10`;
      if (sample.crustAroma.description) {
        text += ` - ${sample.crustAroma.description}`;
      }
      text += "\n";

      text += `Вкусовой профиль: ${sample.flavor.intensity || "0"}/10`;
      if (sample.flavor.description) {
        text += ` - ${sample.flavor.description}`;
      }
      text += "\n";

      text += `Кислотность: ${sample.acidity.intensity || "0"}/10`;
      if (sample.acidity.description) {
        text += ` - ${sample.acidity.description}`;
      }
      text += "\n";

      text += `Сладость: ${sample.sweetness.intensity || "0"}/10`;
      if (sample.sweetness.description) {
        text += ` - ${sample.sweetness.description}`;
      }
      text += "\n";

      text += `Послевкусие: ${sample.aftertaste.duration || "не указано"}`;
      if (sample.aftertaste.description) {
        text += ` - ${sample.aftertaste.description}`;
      }
      text += "\n";

      text += `Тело: ${sample.mouthfeel.body || "не указано"}\n`;
      text += `Текстура: ${sample.mouthfeel.texture || "не указано"}\n`;

      if (sample.overallImpression) {
        text += `Общее впечатление: ${sample.overallImpression}\n`;
      }

      text += "\n";
    });

    if (sessionIndex < sessions.length - 1) {
      text += "\n" + "=".repeat(60) + "\n\n";
    }
  });

  text += "\n=== КОНЕЦ ОТЧЁТА ===\n";
  text += `Сгенерировано: ${new Date().toLocaleString("ru-RU")}\n`;
  text += `Всего сессий: ${sessions.length}\n`;

  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  downloadFile(
    blob,
    filename || `отчёт-каппинга-${new Date().toISOString().split("T")[0]}.txt`,
  );
}

function downloadFile(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
