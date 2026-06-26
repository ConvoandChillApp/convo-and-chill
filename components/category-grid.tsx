"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useRef } from "react"
import type { Category } from "@/types/category"
import { categorySlug } from "@/lib/category-utils"

type CategoryCardConfig = {
  slug: string
  displayTitle?: string
  subtitle?: string
  image?: string
  emoji?: string
  borderColor: string
  glow: string
  activeGlow: string
}

/** Display order matches Supabase sort_order: Controversial → Getting To Know Someone → After Dark → Expansion */
const CATEGORY_CARDS: CategoryCardConfig[] = [
  {
    slug: "controversial",
    displayTitle: "Original Edition",
    subtitle: "99 Controversial Cards",
    image: "/categories/original-edition.png",
    borderColor: "rgba(186, 230, 253, 0.55)",
    glow: "0 0 18px rgba(186, 230, 253, 0.12)",
    activeGlow: "0 0 28px rgba(186, 230, 253, 0.35)",
  },
  {
    slug: "getting-to-know-someone",
    subtitle: "50 Early Stage Qs",
    image: "/categories/getting-to-know-someone.png",
    borderColor: "rgba(192, 38, 211, 0.75)",
    glow: "0 0 20px rgba(192, 38, 211, 0.18)",
    activeGlow: "0 0 32px rgba(192, 38, 211, 0.45)",
  },
  {
    slug: "after-dark",
    displayTitle: "After Dark",
    subtitle: "50 Foreplay Cards",
    image: "/categories/after-dark.png",
    borderColor: "rgba(239, 68, 68, 0.8)",
    glow: "0 0 20px rgba(239, 68, 68, 0.2)",
    activeGlow: "0 0 32px rgba(239, 68, 68, 0.45)",
  },
  {
    slug: "expansion",
    displayTitle: "Expansion",
    subtitle: "50 Controversial Cards",
    image: "/categories/expansion-deck.png",
    borderColor: "rgba(34, 211, 238, 0.75)",
    glow: "0 0 20px rgba(34, 211, 238, 0.18)",
    activeGlow: "0 0 32px rgba(34, 211, 238, 0.45)",
  },
]

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

  const visibleCards = useMemo(() => {
    const categoryBySlug = new Map(
      categories.map((category) => [categorySlug(category.title), category])
    )

    return CATEGORY_CARDS.filter((card) => categoryBySlug.has(card.slug)).map(
      (card) => ({
        ...card,
        title: card.displayTitle ?? categoryBySlug.get(card.slug)!.title,
      })
    )
  }, [categories])

  function scrollByDirection(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -140 : 140,
      behavior: "smooth",
    })
  }

  if (visibleCards.length === 0) {
    return null
  }

  return (
    <div className="relative -mx-1 w-[calc(100%+0.5rem)]">
      <button
        type="button"
        aria-label="Scroll categories left"
        onClick={() => scrollByDirection("left")}
        className="absolute -left-0.5 top-[42%] z-10 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
      >
        <ChevronLeft className="size-6 stroke-[1.5]" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto px-5 py-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {visibleCards.map((card) => {
          const isActive = activeCategory === card.slug

          return (
            <button
              key={card.slug}
              type="button"
              onClick={() => onSelect(card.slug)}
              className="group flex w-[7.25rem] shrink-0 flex-col overflow-hidden rounded-[1.125rem] bg-[#0a0a0f] text-left transition-all duration-200"
              style={{
                border: `1px solid ${card.borderColor}`,
                boxShadow: isActive ? card.activeGlow : card.glow,
              }}
            >
              <div className="flex h-[8.25rem] items-end justify-center px-2 pt-3">
                {card.image ? (
                  <Image
                    src={card.image}
                    alt=""
                    width={108}
                    height={108}
                    className="h-[6.75rem] w-auto max-w-full object-contain object-bottom transition-transform duration-200 group-hover:scale-[1.02]"
                  />
                ) : (
                  <span className="pb-6 text-5xl leading-none">{card.emoji}</span>
                )}
              </div>

              <div className="flex flex-col items-center px-2 pb-3.5 pt-1 text-center">
                <span className="text-[0.8125rem] font-bold leading-tight text-white">
                  {card.title}
                </span>
                {card.subtitle ? (
                  <span className="mt-1.5 text-[0.625rem] leading-snug text-white/40">
                    {card.subtitle}
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
        className="absolute -right-0.5 top-[42%] z-10 -translate-y-1/2 text-white/30 transition-colors hover:text-white/60"
      >
        <ChevronRight className="size-6 stroke-[1.5]" />
      </button>
    </div>
  )
}
