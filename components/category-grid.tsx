"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef } from "react"
import type { Category } from "@/types/category"
import { categorySlug } from "@/lib/category-utils"

type CategoryStyle = {
  displayTitle?: string
  subtitle?: string
  image?: string
  emoji?: string
  border: string
  glow: string
  activeGlow: string
  ring: string
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  controversial: {
    displayTitle: "Original Edition",
    subtitle: "99 Controversial Cards",
    image: "/categories/original-edition.png",
    border: "border-cyan-400/70",
    ring: "ring-cyan-400/40",
    glow: "shadow-[0_0_14px_rgba(34,211,238,0.25)]",
    activeGlow: "shadow-[0_0_28px_rgba(34,211,238,0.55)]",
  },
  expansion: {
    displayTitle: "Expansion Deck",
    subtitle: "50 Foreplay Cards",
    image: "/categories/expansion-deck.png",
    border: "border-blue-400/70",
    ring: "ring-blue-400/40",
    glow: "shadow-[0_0_14px_rgba(96,165,250,0.25)]",
    activeGlow: "shadow-[0_0_28px_rgba(96,165,250,0.55)]",
  },
  "getting-to-know-someone": {
    emoji: "🤝",
    subtitle: "Connection prompts",
    border: "border-yellow-500/70",
    ring: "ring-yellow-500/40",
    glow: "shadow-[0_0_14px_rgba(234,179,8,0.25)]",
    activeGlow: "shadow-[0_0_28px_rgba(234,179,8,0.55)]",
  },
  dating: {
    emoji: "💕",
    subtitle: "Connection prompts",
    border: "border-pink-500/70",
    ring: "ring-pink-500/40",
    glow: "shadow-[0_0_14px_rgba(236,72,153,0.25)]",
    activeGlow: "shadow-[0_0_28px_rgba(236,72,153,0.55)]",
  },
  "after-dark": {
    displayTitle: "After Dark",
    subtitle: "50 Foreplay Cards",
    image: "/categories/after-dark.png",
    border: "border-red-500/80",
    ring: "ring-red-500/45",
    glow: "shadow-[0_0_14px_rgba(239,68,68,0.3)]",
    activeGlow: "shadow-[0_0_28px_rgba(239,68,68,0.6)]",
  },
}

const DEFAULT_STYLE: CategoryStyle = {
  emoji: "✨",
  border: "border-white/20",
  ring: "ring-white/15",
  glow: "shadow-[0_0_10px_rgba(255,255,255,0.08)]",
  activeGlow: "shadow-[0_0_20px_rgba(255,255,255,0.2)]",
}

interface CategoryGridProps {
  categories: Category[]
  activeCategory: string
  onSelect: (slug: string) => void
}

export function CategoryGrid({
  categories,
  activeCategory,
  onSelect,
}: CategoryGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scrollByDirection(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -168 : 168,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        aria-label="Scroll categories left"
        onClick={() => scrollByDirection("left")}
        className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-1 text-white/35 transition-colors hover:text-white/70"
      >
        <ChevronLeft className="size-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-6 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((category) => {
          const slug = categorySlug(category.title)
          const isActive = activeCategory === slug
          const style = CATEGORY_STYLES[slug] ?? DEFAULT_STYLE
          const title = style.displayTitle ?? category.title

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelect(slug)}
              className={`group flex w-[9.5rem] shrink-0 flex-col overflow-hidden rounded-2xl border bg-[#12121c] text-left transition-all duration-200 ${
                style.border
              } ${isActive ? `${style.activeGlow} ring-2 ${style.ring}` : style.glow}`}
            >
              <div className="relative flex h-[7.5rem] items-center justify-center bg-[#0a0a0f] px-3 pt-3">
                {style.image ? (
                  <Image
                    src={style.image}
                    alt=""
                    width={120}
                    height={120}
                    className="h-full w-auto max-w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                  />
                ) : (
                  <span className="text-4xl leading-none">
                    {style.emoji ?? DEFAULT_STYLE.emoji}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col items-center px-2 pb-3 pt-2 text-center">
                <span className="text-sm font-bold leading-tight text-white">
                  {title}
                </span>
                {style.subtitle ? (
                  <span className="mt-1 text-[0.6875rem] leading-snug text-white/45">
                    {style.subtitle}
                  </span>
                ) : null}
              </div>
            </button>
          )
        })}
      </div>

      <button
        type="button"
        aria-label="Scroll categories right"
        onClick={() => scrollByDirection("right")}
        className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full p-1 text-white/35 transition-colors hover:text-white/70"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}
