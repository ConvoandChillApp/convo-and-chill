import type { Metadata } from "next"

const SHARE_SITE_URL = "https://convoandchill.app"

export const SHARE_HEADLINE = "Question For You 👀"

/** Shown under the title in WhatsApp / iMessage link previews. */
export const OG_PREVIEW_DESCRIPTION = "Tap to view question card →"

/** Page meta description — kept aligned with preview card copy. */
export const OG_DESCRIPTION = OG_PREVIEW_DESCRIPTION

export const OG_IMAGE_WIDTH = 1200
export const OG_IMAGE_HEIGHT = 630

/** Share link shown in WhatsApp — always bare domain, no www. */
export function getShareUrl(questionId: number): string {
  return `${SHARE_SITE_URL}/s/${questionId}`
}

export function buildShareMessage(_promptText: string, questionId: number): string {
  return getShareUrl(questionId)
}

export function buildShareUrl(questionId: number): string {
  return getShareUrl(questionId)
}

export function getServerShareUrl(questionId: number): string {
  return getShareUrl(questionId)
}

/** Absolute OG image URL — bare domain returns 200 directly (www 308-redirects). */
export function getOgImageUrl(
  promptText: string,
  categoryTitle: string,
  questionId?: number
): string {
  const params = new URLSearchParams({
    text: promptText,
    category: categoryTitle,
  })

  if (questionId != null) {
    params.set("id", String(questionId))
  }

  return `${SHARE_SITE_URL}/api/og?${params.toString()}`
}

type ShareableQuestion = {
  id: number
  promptText: string
  categoryTitle: string
}

/** Consistent Open Graph / Twitter metadata for every shared question card. */
export function buildSharedQuestionMetadata(
  question: ShareableQuestion
): Metadata {
  const url = getShareUrl(question.id)
  const ogImageUrl = getOgImageUrl(
    question.promptText,
    question.categoryTitle,
    question.id
  )

  const image = {
    url: ogImageUrl,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    type: "image/png" as const,
    alt: question.promptText,
  }

  return {
    title: `${SHARE_HEADLINE} — Convo & Chill`,
    description: OG_PREVIEW_DESCRIPTION,
    openGraph: {
      title: SHARE_HEADLINE,
      description: OG_PREVIEW_DESCRIPTION,
      url,
      siteName: "Convo & Chill",
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: SHARE_HEADLINE,
      description: OG_PREVIEW_DESCRIPTION,
      images: [ogImageUrl],
    },
  }
}

export function buildShareNotFoundMetadata(questionId: number): Metadata {
  const url = getShareUrl(questionId)

  return {
    title: "Question not found | Convo & Chill",
    description: OG_DESCRIPTION,
    openGraph: {
      title: "Convo & Chill",
      description: OG_DESCRIPTION,
      url,
      siteName: "Convo & Chill",
      type: "website",
    },
  }
}
