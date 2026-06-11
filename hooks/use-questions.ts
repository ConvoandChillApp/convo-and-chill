"use client"

import { useCallback, useEffect, useState } from "react"
import { fetchQuestionsByCategoryId } from "@/lib/questions"
import {
  formatSupabaseError,
  logSupabaseError,
} from "@/lib/supabase-error"
import type { Question } from "@/types/question"

export function useQuestions(categoryId: number | null) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (categoryId === null) {
      return
    }

    const id = categoryId
    let cancelled = false

    async function loadQuestions() {
      setLoading(true)
      setError(null)
      setCurrentIndex(0)

      try {
        const data = await fetchQuestionsByCategoryId(id)
        if (!cancelled) {
          setQuestions(data)
        }
      } catch (err) {
        logSupabaseError("useQuestions", err)

        if (!cancelled) {
          setQuestions([])
          setError(
            formatSupabaseError(err, "Failed to load questions")
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadQuestions()

    return () => {
      cancelled = true
    }
  }, [categoryId])

  const activeQuestions = categoryId === null ? [] : questions
  const activeIndex = categoryId === null ? 0 : currentIndex
  const activeLoading = categoryId === null ? false : loading
  const activeError = categoryId === null ? null : error

  const current = activeQuestions[activeIndex] ?? null
  const total = activeQuestions.length
  const canGoPrev = activeIndex > 0
  const canGoNext = activeIndex < activeQuestions.length - 1

  const goNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(index + 1, activeQuestions.length - 1))
  }, [activeQuestions.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0))
  }, [])

  return {
    current,
    currentNumber: total > 0 ? activeIndex + 1 : 0,
    total,
    loading: activeLoading,
    error: activeError,
    canGoPrev,
    canGoNext,
    goNext,
    goPrev,
  }
}
