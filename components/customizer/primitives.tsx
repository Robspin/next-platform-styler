"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { CheckIcon, CopyIcon, XIcon } from "lucide-react";
import * as React from "react";

export const customizerButton = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/85",
        outline: "border bg-transparent hover:bg-accent",
        ghost: "hover:bg-accent",
      },
      size: {
        default: "h-8 px-3",
        sm: "h-7 px-2 text-xs",
        icon: "size-8",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: { variant: "outline", size: "default" },
  },
);

export function CustomizerButton({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof customizerButton>) {
  return (
    <button
      type="button"
      className={cn(customizerButton({ variant, size }), className)}
      {...props}
    />
  );
}

export function Hint({
  label,
  side = "top",
  children,
}: {
  label: React.ReactNode;
  side?: TooltipPrimitive.Positioner.Props["side"];
  children: React.ReactElement;
}) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger render={children} />
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Positioner
          side={side}
          sideOffset={6}
          className="customizer z-80"
        >
          <TooltipPrimitive.Popup className="rounded-md bg-foreground px-2 py-1 text-xs text-background shadow-md transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0">
            {label}
          </TooltipPrimitive.Popup>
        </TooltipPrimitive.Positioner>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}

export function CustomizerDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-80 bg-black/40 backdrop-blur-xs transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <DialogPrimitive.Popup className="customizer fixed top-1/2 left-1/2 z-80 grid max-h-[calc(100svh-2rem)] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-2xl border bg-background p-5 shadow-2xl transition-all data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <div className="grid gap-1 pr-8">
            <DialogPrimitive.Title className="text-base font-semibold">
              {title}
            </DialogPrimitive.Title>
            <DialogPrimitive.Description className="text-muted-foreground">
              {description}
            </DialogPrimitive.Description>
          </div>
          {children}
          <DialogPrimitive.Close
            aria-label="Close"
            className={cn(
              customizerButton({ variant: "ghost", size: "icon-sm" }),
              "absolute top-3 right-3",
            )}
          >
            <XIcon />
          </DialogPrimitive.Close>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function useCopy(timeout = 1500) {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), timeout);
    return () => clearTimeout(timer);
  }, [copied, timeout]);

  const copy = React.useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
  }, []);

  return { copied, copy };
}

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const { copied, copy } = useCopy();

  return (
    <Hint label={copied ? "Copied" : label}>
      <CustomizerButton
        variant="ghost"
        size="icon-sm"
        aria-label={label}
        className={className}
        onClick={() => copy(value)}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </CustomizerButton>
    </Hint>
  );
}

export function CodeBlock({
  code,
  label,
  className,
}: {
  code: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("relative rounded-lg border bg-card", className)}>
      <pre className="max-h-72 overflow-auto p-3 pr-11 font-mono text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
      <CopyButton
        value={code}
        label={`Copy ${label}`}
        className="absolute top-1.5 right-1.5 bg-card"
      />
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  onValueChange,
  options,
  label,
}: {
  value: T;
  onValueChange: (value: T) => void;
  options: { value: T; label: string }[];
  label: string;
}) {
  return (
    <RadioGroup
      aria-label={label}
      value={value}
      onValueChange={(next) => onValueChange(next as T)}
      className="flex rounded-lg border p-0.5"
    >
      {options.map((option) => (
        <Radio.Root
          key={option.value}
          value={option.value}
          className="h-7 flex-1 rounded-md px-2 text-xs font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 data-checked:bg-accent data-checked:text-foreground"
        >
          {option.label}
        </Radio.Root>
      ))}
    </RadioGroup>
  );
}
