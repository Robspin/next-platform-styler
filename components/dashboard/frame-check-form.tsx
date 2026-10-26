"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FrameCheckForm() {
  const [result, setResult] = React.useState<string | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const frameNumber = String(
      new FormData(event.currentTarget).get("frameNumber") ?? "",
    ).trim();
    setResult(
      frameNumber
        ? `Geen registratie gevonden voor ${frameNumber.toUpperCase()}.`
        : "Voer eerst een framenummer in.",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <div className="flex gap-2">
        <Input
          name="frameNumber"
          placeholder="Voer framenummer in"
          aria-label="Framenummer"
          autoComplete="off"
          spellCheck={false}
        />
        <Button type="submit">Check</Button>
      </div>
      <p aria-live="polite" className="min-h-4 text-xs text-muted-foreground">
        {result}
      </p>
    </form>
  );
}
