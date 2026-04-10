"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createEmptySession } from "@/lib/types";
import { saveSession } from "@/lib/storage";

interface SessionSetupProps {
  onCancel: () => void;
}

export function SessionSetup({ onCancel }: SessionSetupProps) {
  const router = useRouter();
  const [sampleCount, setSampleCount] = useState(4);
  const [isPending, startTransition] = useTransition();

  const handleStart = () => {
    if (sampleCount < 1 || sampleCount > 20) return;
    const session = createEmptySession(sampleCount);
    saveSession(session);
    startTransition(() => {
      router.push(`/session?id=${session.id}`);
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="sampleCount"
          className="text-sm font-medium text-foreground"
        >
          Количество образцов
        </label>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSampleCount((prev) => Math.max(1, prev - 1))}
            disabled={sampleCount <= 1}
            aria-label="Уменьшить количество"
          >
            <span className="text-lg">-</span>
          </Button>
          <Input
            id="sampleCount"
            type="number"
            min={1}
            max={20}
            value={sampleCount}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              if (!isNaN(val) && val >= 1 && val <= 20) {
                setSampleCount(val);
              }
            }}
            className="w-20 text-center"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSampleCount((prev) => Math.min(20, prev + 1))}
            disabled={sampleCount >= 20}
            aria-label="Увеличить количество"
          >
            <span className="text-lg">+</span>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Выберите от 1 до 20 образцов
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Отмена
        </Button>
        <Button onClick={handleStart} disabled={isPending} className="flex-1">
          {isPending ? "Запуск..." : "Начать сессию"}
        </Button>
      </div>
    </div>
  );
}
