"use client"

import type { Category } from "@/types/category"
import { categorySlug } from "@/lib/category-utils"

type CategoryStyle = {
  emoji: string
  border: string
  glow: string
  activeGlow: string
}

const CATEGORY_STYLES: Record<string, CategoryStyle> = {
  "getting-to-know-someone": {
    emoji: "🤝",
    border: "border-yellow-500",
    glow: "shadow-[0_0_10px_rgba(234,179,8,0.35)]",
    activeGlow: "shadow-[0_0_22px_rgba(234,179,8,0.85)]",
  },
  dating: {
    emoji: "💕",
    border: "border-pink-500",
    glow: "shadow-[0_0_10px_rgba(236,72,153,0.35)]",
    activeGlow: "shadow-[0_0_22px_rgba(236,72,153,0.85)]",
  },
  controversial: {
    emoji: "🔥",
    border: "border-orange-500",
    glow: "shadow-[0_0_10px_rgba(249,115,22,0.35)]",
    activeGlow: "shadow-[0_0_22px_rgba(249,115,22,0.85)]",
  },
  "after-dark": {
    emoji: "😈",
    border: "border-purple-500",
    glow: "shadow-[0_0_10px_rgba(168,85,247,0.35)]",
    activeGlow: "shadow-[0_0_22px_rgba(168,85,247,0.85)]",
  },
}

const DEFAULT_STYLE: CategoryStyle = {
  emoji: "✨",
  border: "border-white/20",
  glow: "shadow-[0_0_8px_rgba(255,255,255,0.1)]",
  activeGlow: "shadow-[0_0_16px_rgba(255,255,255,0.25)]",
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
  return (
    <div className="flex w-full gap-2">
      {categories.map((category) => {
        const slug = categorySlug(category.title)
        const isActive = activeCategory === slug
        const style = CATEGORY_STYLES[slug] ?? DEFAULT_STYLE

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(slug)}
            className={`relative flex min-w-0 flex-1 items-center gap-2 rounded-xl border bg-[#1A1A2E] px-2.5 py-3 transition-shadow ${
              style.border
            } ${isActive ? style.activeGlow : style.glow}`}
          >
            <span className="shrink-0 text-base leading-none">{style.emoji}</span>
            <span className="truncate text-left text-xs font-bold text-white sm:text-sm">
              {category.title}
            </span>
          </button>
        )
      })}
    </div>
  )
}
