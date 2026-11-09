import type * as React from "react";

import { DecryptedText } from "@/components/effects/decrypted-text";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=<>/";

export function ScrambleText(
  props: React.ComponentProps<typeof DecryptedText>,
) {
  return (
    <DecryptedText
      characters={GLYPHS}
      animateOn="view"
      sequential
      speed={40}
      scrambleColor="var(--primary-text)"
      {...props}
    />
  );
}
