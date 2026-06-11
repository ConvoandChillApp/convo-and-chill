"use client"

import type { Category } from "@/types/category"

interface CategoryPillsProps {
  categories: Category[]
  activeId: number | null
  onSelect: (categoryId: number) => void
}

export function CategoryPills({
  categories,
  activeId,
  onSelect,
}: CategoryPillsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const isActive = activeId === category.id

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(category.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-gradient-to-r from-[oklch(0.62_0.27_330)] to-[oklch(0.55_0.24_295)] text-white"
                : "border border-white/10 bg-cc-pill text-cc-pill-text hover:bg-white/10"
            }`}
          >
            {category.title}
          </button>
        )
      })}
    </div>
  )
}
