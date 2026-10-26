"use client";

import { Menu } from "@base-ui/react/menu";
import { cn } from "cn";
import { CheckIcon } from "lucide-react";
import type * as React from "react";

import { useIsMobile } from "@/hooks/use-mobile";

export type PickerOption<T extends string> = {
  value: T;
  label: string;
  description?: string;
  preview?: React.ReactNode;
  disabled?: boolean;
};

export type PickerGroup<T extends string> = {
  label?: string;
  options: PickerOption<T>[];
};

export function Picker<T extends string>({
  label,
  value,
  groups,
  preview,
  disabled,
  onValueChange,
  onPreview,
}: {
  label: string;
  value: T;
  groups: PickerGroup<T>[];
  preview?: React.ReactNode;
  disabled?: boolean;
  onValueChange: (value: T) => void;
  onPreview: (value: T | null) => void;
}) {
  const isMobile = useIsMobile();
  const selected = groups
    .flatMap((group) => group.options)
    .find((option) => option.value === value);

  return (
    <Menu.Root
      modal={false}
      onOpenChange={(open) => {
        if (!open) onPreview(null);
      }}
    >
      <Menu.Trigger
        disabled={disabled}
        className="flex w-full items-center gap-3 rounded-lg px-2.5 py-1.5 text-left transition-colors outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50 data-popup-open:bg-accent"
      >
        <span className="grid min-w-0 flex-1">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="truncate font-medium">{selected?.label}</span>
        </span>
        {preview && (
          <span className="flex shrink-0 items-center" aria-hidden>
            {preview}
          </span>
        )}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner
          side={isMobile ? "top" : "left"}
          align={isMobile ? "center" : "start"}
          sideOffset={isMobile ? 8 : 20}
          collisionPadding={12}
          className="customizer z-70 outline-none"
        >
          <Menu.Popup
            onMouseLeave={() => onPreview(null)}
            className="max-h-[min(var(--available-height),28rem)] w-64 origin-(--transform-origin) overflow-y-auto overscroll-contain rounded-xl border bg-popover p-1 text-popover-foreground shadow-2xl outline-none transition-[opacity,scale] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
          >
            <Menu.RadioGroup
              value={value}
              onValueChange={(next) => onValueChange(next as T)}
            >
              {groups.map((group, index) => (
                <Menu.Group
                  key={group.label ?? index}
                  className={cn(index > 0 && "mt-1 border-t pt-1")}
                >
                  {group.label && (
                    <Menu.GroupLabel className="px-2 py-1.5 text-xs text-muted-foreground">
                      {group.label}
                    </Menu.GroupLabel>
                  )}
                  {group.options.map((option) => (
                    <Menu.RadioItem
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      disabled={option.disabled}
                      closeOnClick
                      onFocus={() => onPreview(option.value)}
                      onMouseEnter={() => onPreview(option.value)}
                      className="flex cursor-default items-center gap-2.5 rounded-lg px-2 py-1.5 outline-none select-none data-disabled:pointer-events-none data-disabled:opacity-40 data-highlighted:bg-accent"
                    >
                      {option.preview && (
                        <span className="flex w-5 shrink-0 justify-center">
                          {option.preview}
                        </span>
                      )}
                      <span className="grid min-w-0 flex-1">
                        <span className="truncate">{option.label}</span>
                        {option.description && (
                          <span className="truncate text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        )}
                      </span>
                      <Menu.RadioItemIndicator className="shrink-0">
                        <CheckIcon className="size-4" />
                      </Menu.RadioItemIndicator>
                    </Menu.RadioItem>
                  ))}
                </Menu.Group>
              ))}
            </Menu.RadioGroup>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
