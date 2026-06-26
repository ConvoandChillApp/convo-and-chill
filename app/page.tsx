"use client"

import { useMemo, useState } from "react"
import {
  BottomNav,
  CategoryGrid,
  Controls,
  Header,
  MainCard,
  Progress,
  Toast,
} from "@/components"
import { useCategories } from "@/hooks/use-categories"
import { useQuestions } from "@/hooks/use-questions"
import { categorySlug } from "@/lib/category-utils"
import { trackCardShared, trackCardSwiped } from "@/lib/analytics"
import { buildShareMessage } from "@/lib/share"
import { incrementShareCount } from "@/lib/share-analytics"

export default function HomePage() {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(
    null
  )
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories()

  const resolvedCategorySlug = useMemo(() => {
    if (activeCategorySlug) return activeCategorySlug
    if (categories.length === 0) return null

    const slugs = new Set(categories.map((c) => categorySlug(c.title)))
    const firstDeck = [
      "controversial",
      "getting-to-know-someone",
      "after-dark",
      "expansion",
    ].find((slug) => slugs.has(slug))
    if (firstDeck) return firstDeck

    return categorySlug(categories[0].title)
  }, [activeCategorySlug, categories])

  const activeCategoryId = useMemo(() => {
    if (!resolvedCategorySlug) return null

    return (
      categories.find(
        (category) => categorySlug(category.title) === resolvedCategorySlug
      )?.id ?? null
    )
  }, [categories, resolvedCategorySlug])

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

    const url = buildShareMessage(current.promptText, current.id)

    void incrementShareCount(current.id)

    if (navigator.share) {
      try {
        // Plain URL text keeps WhatsApp large-image previews (url+title → compact card).
        await navigator.share({ text: url })
        trackCardShared(current.id, "native_share")
        return
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        await navigator.clipboard.writeText(url)
        trackCardShared(current.id, "clipboard")
        showCopiedToast()
      }
      return
    }

    await navigator.clipboard.writeText(url)
    trackCardShared(current.id, "clipboard")
    showCopiedToast()
  }

  function handleGoNext() {
    if (!canGoNext || loading || !current) return

    trackCardSwiped(current.id, current.categoryTitle)
    goNext()
  }

  function handleGoPrev() {
    if (!canGoPrev || loading || !current) return

    trackCardSwiped(current.id, current.categoryTitle)
    goPrev()
  }

  function handleTouchEnd(endX: number) {
    if (touchStartX === null || loading) return

    const delta = endX - touchStartX
    if (delta < -50 && canGoNext) handleGoNext()
    else if (delta > 50 && canGoPrev) handleGoPrev()
    setTouchStartX(null)
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col gap-5 bg-[#0A0A0F] px-4 pb-28 pt-6">
      <Header />

      <CategoryGrid
        categories={categories}
        activeCategory={resolvedCategorySlug ?? ""}
        onSelect={setActiveCategorySlug}
      />

      <div
        className="flex flex-1"
        onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
        onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].clientX)}
      >
        <MainCard
          question={cardQuestion}
          animationKey={current?.id ?? "loading"}
        />
      </div>

      <Controls
        onPrev={handleGoPrev}
        onNext={handleGoNext}
        onShare={share}
        disablePrev={!canGoPrev || loading}
        disableNext={!canGoNext || loading}
        disableShare={!current || loading}
      />

      <Progress current={currentNumber} total={total} />

      <BottomNav />
      <Toast message="Copied!" visible={toastVisible} />
    </main>
  )
}
