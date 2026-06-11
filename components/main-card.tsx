"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import { categorySlug } from "@/lib/category-utils"

export type MainCardQuestion = {
  text: string
  category?: string
}

const CATEGORY_EMOJI: Record<string, string> = {
  dating: "💕",
  controversial: "🔥",
  "after-dark": "😈",
}

interface MainCardProps {
  question: MainCardQuestion
  animationKey?: string | number
}

function getHighlightWord(text: string): string | null {
  const words = text.match(/[A-Za-z']+/g) ?? []
  const candidates = words.filter((word) => word.length >= 5)
  if (candidates.length === 0) return null

  return candidates.reduce((longest, word) =>
    word.length > longest.length ? word : longest
  )
}

function renderHighlightedText(text: string) {
  const highlight = getHighlightWord(text)
  if (!highlight) return text

  const index = text.toLowerCase().indexOf(highlight.toLowerCase())
  if (index === -1) return text

  const before = text.slice(0, index)
  const match = text.slice(index, index + highlight.length)
  const after = text.slice(index + highlight.length)

  return (
    <>
      {before}
      <span className="text-[#22D3EE]">{match}</span>
      {after}
    </>
  )
}

export function MainCard({ question, animationKey = "default" }: MainCardProps) {
  const emoji = question.category
    ? CATEGORY_EMOJI[categorySlug(question.category)] ?? "✨"
    : "✨"

  return (
    <div className="relative flex w-full flex-1 items-center justify-center py-2">
      {/* Partial stack edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 z-0 h-[72%] w-6 -translate-y-1/2 rounded-r-2xl border border-fuchsia-500/20 bg-gradient-to-br from-[#0D0D2B]/80 to-[#4A0E8F]/40 opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 z-0 h-[72%] w-6 -translate-y-1/2 rounded-l-2xl border border-fuchsia-500/20 bg-gradient-to-bl from-[#EC4899]/30 to-[#0D0D2B]/80 opacity-50"
      />

      <article
        key={animationKey}
        className="animate-card-enter relative z-10 flex min-h-[58dvh] w-full max-w-sm flex-col overflow-hidden rounded-3xl border border-fuchsia-500/30 shadow-[0_0_30px_rgba(192,38,211,0.25),0_0_60px_rgba(236,72,153,0.15)]"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0D0D2B] via-[#4A0E8F] to-[#C026D3]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#EC4899]/70" />

        <div className="relative z-10 flex flex-1 flex-col p-6">
          {question.category ? (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-black/35 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <span>{emoji}</span>
              {question.category}
            </span>
          ) : null}

          <div className="flex flex-1 items-center justify-center px-2">
            <p className="text-center text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
              {renderHighlightedText(question.text)}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 text-xs font-medium text-white/50">
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>Swipe for more</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </div>
        </div>
      </article>
    </div>
  )
}
