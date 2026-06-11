"use client"

import { useEffect, useMemo, useState } from "react"
import { Header } from "@/components/header"
import { CategoryGrid } from "@/components/category-grid"
import { MainCard } from "@/components/main-card"
import { Controls } from "@/components/controls"
import { Progress } from "@/components/progress-bar"
import { BottomNav } from "@/components/bottom-nav"
import { Toast } from "@/components/toast"
import { useCategories } from "@/hooks/use-categories"
import { useQuestions } from "@/hooks/use-questions"
import { categorySlug } from "@/lib/category-utils"
import { buildShareUrl } from "@/lib/share"
import { incrementShareCount } from "@/lib/share-analytics"

export default function HomePage() {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(
    null
  )
  const [activeTab, setActiveTab] = useState("home")
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories()

  const activeCategoryId = useMemo(() => {
    if (!activeCategorySlug) return null

    return (
      categories.find(
        (category) => categorySlug(category.title) === activeCategorySlug
      )?.id ?? null
    )
  }, [categories, activeCategorySlug])

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
    if (categories.length > 0 && activeCategorySlug === null) {
      setActiveCategorySlug(categorySlug(categories[0].title))
    }
  }, [categories, activeCategorySlug])

  const loading = categoriesLoading || questionsLoading
  const error = categoriesError ?? questionsError

  const cardQuestion = useMemo(() => {
    if (loading) {
      return { text: "Loading...", category: "" }
    }

    if (error) {
      return { text: error, category: "" }
    }

    if (!current) {
      return { text: "No questions found for this category.", category: "" }
    }

    return {
      text: current.promptText,
      category: current.categoryTitle,
    }
  }, [loading, error, current])

  function showCopiedToast() {
    setToastVisible(true)
    window.setTimeout(() => setToastVisible(false), 2000)
  }

  async function share() {
    if (!current) return

    const url = buildShareUrl(window.location.origin, current.id)

    void incrementShareCount(current.id)

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Convo & Chill",
          text: current.promptText,
          url,
        })
        return
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        await navigator.clipboard.writeText(url)
        showCopiedToast()
      }
      return
    }

    await navigator.clipboard.writeText(url)
    showCopiedToast()
  }

  function handleTouchEnd(endX: number) {
    if (touchStartX === null || loading) return

    const delta = endX - touchStartX
    if (delta < -50 && canGoNext) goNext()
    else if (delta > 50 && canGoPrev) goPrev()
    setTouchStartX(null)
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pb-28 pt-6">
      <Header />

      <CategoryGrid
        categories={categories}
        activeCategory={activeCategorySlug ?? ""}
        onSelect={setActiveCategorySlug}
      />

      <div
        className="flex flex-1"
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
      >
        <MainCard question={cardQuestion} />
      </div>

      <Controls
        onPrev={goPrev}
        onNext={goNext}
        onShare={share}
        disablePrev={!canGoPrev || loading}
        disableNext={!canGoNext || loading}
        disableShare={!current || loading}
      />

      <Progress current={currentNumber} total={total} />

      <BottomNav active={activeTab} onChange={setActiveTab} />
      <Toast message="Link copied!" visible={toastVisible} />
    </main>
  )
}
