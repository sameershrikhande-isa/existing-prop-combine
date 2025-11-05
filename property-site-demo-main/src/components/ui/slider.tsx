"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

export type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>

export const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
  >(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track data-slot="slider-track" className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-black/10 dark:bg-white/15">
      <SliderPrimitive.Range data-slot="slider-range" className="absolute h-full bg-black dark:bg-white" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb data-slot="slider-thumb" className="block size-4 rounded-full border border-black/20 dark:border-white/20 bg-white dark:bg-dark shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb data-slot="slider-thumb" className="block size-4 rounded-full border border-black/20 dark:border-white/20 bg-white dark:bg-dark shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))

Slider.displayName = "Slider"

export default Slider


