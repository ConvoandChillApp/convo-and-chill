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

    const message = buildShareMessage(current.promptText, current.id)

    void incrementShareCount(current.id)

    if (navigator.share) {
      try {
        await navigator.share({ text: message })
        return
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return
        await navigator.clipboard.writeText(message)
        showCopiedToast()
      }
      return
    }

    await navigator.clipboard.writeText(message)
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
        onPrev={goPrev}
        onNext={goNext}
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
