import posthog from "posthog-js"
import { categorySlug } from "@/lib/category-utils"

function canCapture(): boolean {
  return (
    typeof window !== "undefined" &&
    Boolean(process.env.NEXT_PUBLIC_POSTHOG_KEY)
  )
}

export function trackCardSwiped(questionId: number, categoryTitle: string) {
  if (!canCapture()) return

  posthog.capture("card_swiped", {
    question_id: questionId,
    category: categorySlug(categoryTitle),
  })
}

export function trackCardShared(questionId: number, platform: string) {
  if (!canCapture()) return

  posthog.capture("card_shared", {
    question_id: questionId,
    platform,
  })
}

export function trackPaywallViewed() {
  if (!canCapture()) return

  posthog.capture("paywall_viewed")
}

export function trackShareLinkOpened(questionId: number, categoryTitle: string) {
  if (!canCapture()) return

  posthog.capture("share_link_opened", {
    question_id: questionId,
    category: categorySlug(categoryTitle),
  })
}
