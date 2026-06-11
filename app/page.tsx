"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, ArrowRight, Share2, User } from "lucide-react"
import { CategoryPills } from "@/components/category-pills"
import { QuestionCard } from "@/components/question-card"
import { BottomNav } from "@/components/bottom-nav"
import { useCategories } from "@/hooks/use-categories"
import { useQuestions } from "@/hooks/use-questions"

export default function Page() {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null)
  const [activeTab, setActiveTab] = useState("Home")
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories()
  const {
    current,
    currentNumber,
    total,
    loading: questionsLoading,
    error: questionsError,
    canGoPrev,
    canGoNext,
    goNext,
    goPrev,
  } = useQuestions(activeCategoryId)

  useEffect(() => {
    if (categories.length > 0 && activeCategoryId === null) {
      setActiveCategoryId(categories[0].id)
    }
  }, [categories, activeCategoryId])

  const activeCategory = categories.find(
    (category) => category.id === activeCategoryId
  )
  const loading = categoriesLoading || questionsLoading
  const error = categoriesError ?? questionsError

  async function handleShare() {
    if (!current) return

    const shareData = {
      title: "Convo & Chill",
      text: current.promptText,
    }

    if (navigator.share) {
      await navigator.share(shareData)
      return
    }

    await navigator.clipboard.writeText(current.promptText)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0d0d]">
      {/* Subtle deep purple radial glow in center */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.4_0.18_300_/_0.35),transparent_65%)] blur-2xl"
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col px-5 pb-28 pt-6">
        {/* Header */}
        <header className="flex items-center justify-between">
          <h1 className="text-lg font-bold tracking-tight text-white">
            CONVO &amp; CHILL
          </h1>
          <button
            type="button"
            aria-label="Profile"
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-cc-pill"
          >
            <User className="size-5 text-cc-pill-text" />
          </button>
        </header>

        {/* Category pills */}
        <div className="mt-5">
          <CategoryPills
            categories={categories}
            activeId={activeCategoryId}
            onSelect={setActiveCategoryId}
          />
        </div>

        {/* Card stack */}
        <div className="mt-12 flex flex-1 flex-col justify-center">
          {loading ? (
            <div className="mx-auto flex w-full max-w-sm flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] p-12 backdrop-blur-sm">
              <div className="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <p className="mt-4 text-sm text-white/60">Loading...</p>
            </div>
          ) : error ? (
            <div className="mx-auto w-full max-w-sm rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
              <p className="text-sm font-medium text-red-200">
                Unable to load content
              </p>
              <p className="mt-2 text-sm text-red-200/80">{error}</p>
            </div>
          ) : current ? (
            <QuestionCard
              category={current.categoryTitle}
              question={current.promptText}
            />
          ) : (
            <div className="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.06] p-8 text-center">
              <p className="text-sm text-white/60">
                No questions found
                {activeCategory ? ` for ${activeCategory.title}` : ""}.
              </p>
            </div>
          )}

          {/* Progress bar */}
          <div className="mx-auto mt-10 flex w-full max-w-sm items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="cc-progress-fill h-full rounded-full transition-all duration-300"
                style={{
                  width: total > 0 ? `${(currentNumber / total) * 100}%` : "0%",
                }}
              />
            </div>
            <span className="text-xs font-medium tabular-nums text-white/60">
              {currentNumber} / {total}
            </span>
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              aria-label="Previous question"
              onClick={goPrev}
              disabled={!canGoPrev || loading}
              className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-cc-pill text-cc-pill-text transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Share question"
              onClick={handleShare}
              disabled={!current || loading}
              className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.62_0.27_330)] to-[oklch(0.55_0.24_295)] text-white shadow-[0_8px_30px_-6px_oklch(0.62_0.27_330_/_0.7)] transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
            >
              <Share2 className="size-6" />
            </button>
            <button
              type="button"
              aria-label="Next question"
              onClick={goNext}
              disabled={!canGoNext || loading}
              className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-cc-pill text-cc-pill-text transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-40"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      </main>

      <BottomNav active={activeTab} onSelect={setActiveTab} />
    </div>
  )
}
