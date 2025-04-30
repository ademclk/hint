import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Apple/HIG tweaks: pill shape (xl radius), extra shadow, glass, better border, blur, focus ring  
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 backdrop-blur-[8px] bg-opacity-80 border border-border" +
  " shadow-[0_1.5px_5px_0_rgba(60,60,60,0.09)]" + // soft outer shadow for pop  
  " [box-shadow:inset_0_1.5px_1.5px_0_rgba(255,255,255,0.5)]" + // inner highlight for glass  
  " outline-none ring-0 focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 transition-[box-shadow,background,ring]",
  {
    variants: {
      variant: {
        default:
          // subtle transparency, glass morphism, smooth bg transition, tap highlight  
          "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 active:bg-destructive/80 focus-visible:ring-destructive/40",
        outline:
          // Apple uses a minimalist outline, so increase border and feather hover  
          "border-2 border-border bg-background/80 hover:bg-accent/60 hover:text-accent-foreground",
        secondary:
          "bg-secondary/80 text-secondary-foreground hover:bg-secondary/50 active:bg-secondary/60",
        ghost:
          "bg-transparent text-primary hover:bg-accent/40 hover:text-accent-foreground active:bg-accent/70",
        link:
          "border-none shadow-none p-0 underline underline-offset-4 text-primary bg-transparent hover:underline hover:bg-transparent",
      },
      size: {
        default: "h-10 px-6 py-2 min-w-[44px] min-h-[44px]", // align with HIG minimum for tap targets  
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
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        // Apple: press/active state subtle scale for tactile response  
        "active:scale-[0.98]",
        // Extra polish: Remove tap highlight on mobile, smooth transitions  
        "select-none [webkit-tap-highlight-color:transparent] duration-200",
        className
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }  