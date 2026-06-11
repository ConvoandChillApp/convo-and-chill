"use client"

import { useCallback, useEffect, useState } from "react"
import { fetchQuestionsByCategoryId } from "@/lib/questions"
import type { Question } from "@/types/question"

export function useQuestions(categoryId: number | null) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (categoryId === null) {
      setQuestions([])
      setCurrentIndex(0)
      setLoading(false)
      setError(null)
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
        if (!cancelled) {
          setQuestions([])
          setError(
            err instanceof Error ? err.message : "Failed to load questions"
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

  const current = questions[currentIndex] ?? null
  const total = questions.length
  const canGoPrev = currentIndex > 0
  const canGoNext = currentIndex < questions.length - 1

  const goNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(index + 1, questions.length - 1))
  }, [questions.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0))
  }, [])

  return {
    current,
    currentNumber: total > 0 ? currentIndex + 1 : 0,
    total,
    loading,
    error,
    canGoPrev,
    canGoNext,
    goNext,
    goPrev,
  }
}
