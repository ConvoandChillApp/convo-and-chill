"use client"

import { useEffect } from "react"
import { trackShareLinkOpened } from "@/lib/analytics"

type ShareLinkOpenedTrackerProps = {
  questionId: number
  categoryTitle: string
}

export function ShareLinkOpenedTracker({
  questionId,
  categoryTitle,
}: ShareLinkOpenedTrackerProps) {
  useEffect(() => {
    trackShareLinkOpened(questionId, categoryTitle)
  }, [questionId, categoryTitle])

  return null
}
