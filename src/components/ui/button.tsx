import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
    "outline-none ring-0 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 transition-[box-shadow,background,ring]",
  ],
  {
    variants: {
      variant: {
        default: ["border border-border backdrop-blur-xl bg-opacity-80 shadow-[0_1.5px_5px_0_rgba(60,60,60,0.09)] [box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.18)] dark:border-border dark:shadow-[0_1.5px_5px_0_rgba(0,0,0,0.25)] dark:[box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.19)]", "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80"],
        destructive: ["border border-border backdrop-blur-xl bg-opacity-80 shadow-[0_1.5px_5px_0_rgba(60,60,60,0.09)] [box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.18)] dark:border-border dark:shadow-[0_1.5px_5px_0_rgba(0,0,0,0.25)] dark:[box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.19)]", "bg-destructive text-white shadow-xs hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive/40"],
        outline: ["border border-border backdrop-blur-xl bg-opacity-80 shadow-[0_1.5px_5px_0_rgba(60,60,60,0.09)] [box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.18)] dark:border-border dark:shadow-[0_1.5px_5px_0_rgba(0,0,0,0.25)] dark:[box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.19)]", "border-2 border-border bg-background/80 hover:bg-accent/60 hover:text-accent-foreground"],
        secondary: ["border border-border backdrop-blur-xl bg-opacity-80 shadow-[0_1.5px_5px_0_rgba(60,60,60,0.09)] [box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.18)] dark:border-border dark:shadow-[0_1.5px_5px_0_rgba(0,0,0,0.25)] dark:[box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.19)]", "bg-secondary/80 text-secondary-foreground hover:bg-secondary/50 active:bg-secondary/60"],
        ghost: ["border border-border backdrop-blur-xl bg-opacity-80 shadow-[0_1.5px_5px_0_rgba(60,60,60,0.09)] [box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.18)] dark:border-border dark:shadow-[0_1.5px_5px_0_rgba(0,0,0,0.25)] dark:[box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.19)]", "bg-transparent text-primary hover:bg-accent/40 hover:text-accent-foreground active:bg-accent/70"],
        link:
          "border-none shadow-none p-0 underline underline-offset-4 text-primary bg-transparent hover:underline hover:bg-transparent",
      },
      size: {
        default: "h-10 px-6 py-2 min-w-[44px] min-h-[44px]",
        sm: "h-8 px-4 min-w-[32px] min-h-[32px]",
        lg: "h-12 px-8 min-w-[56px] min-h-[56px]",
        icon: "size-10 min-w-[44px] min-h-[44px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(
        "active:scale-[0.98]",
        "select-none [webkit-tap-highlight-color:transparent] duration-200",
        "cursor-pointer",
        buttonVariants({ variant, size }),
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }  