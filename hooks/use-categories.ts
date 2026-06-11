"use client"

import { useEffect, useState } from "react"
import { fetchActiveCategories } from "@/lib/categories"
import type { Category } from "@/types/category"

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      setLoading(true)
      setError(null)

      try {
        const data = await fetchActiveCategories()
        if (!cancelled) {
          setCategories(data)
        }
      } catch (err) {
        if (!cancelled) {
          setCategories([])
          setError(
            err instanceof Error ? err.message : "Failed to load categories"
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadCategories()

    return () => {
      cancelled = true
    }
  }, [])

  return { categories, loading, error }
}
