"use client"

import type { Category } from "@/types/category"
import { categorySlug } from "@/lib/category-utils"

const GRADIENTS = [
  "from-violet-500 via-purple-500 to-fuchsia-600",
  "from-orange-400 via-pink-500 to-rose-500",
  "from-cyan-400 via-blue-500 to-indigo-600",
  "from-emerald-400 via-teal-500 to-cyan-600",
  "from-amber-400 via-orange-500 to-red-500",
  "from-pink-400 via-rose-500 to-purple-600",
] as const

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
    <div className="grid grid-cols-3 gap-2.5">
      {categories.map((category, index) => {
        const slug = categorySlug(category.title)
        const isActive = activeCategory === slug
        const gradient = GRADIENTS[index % GRADIENTS.length]

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onSelect(slug)}
            className={`relative overflow-hidden rounded-2xl px-3 py-3 text-left transition-transform ${
              isActive ? "scale-[1.02] ring-2 ring-white/30" : "opacity-80 hover:opacity-100"
            }`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} ${
                isActive ? "opacity-100" : "opacity-70"
              }`}
            />
            <span className="relative z-10 block text-xs font-semibold leading-tight text-white">
              {category.title}
            </span>
          </button>
        )
      })}
    </div>
  )
}
