const SHARE_SITE_URL = "https://convoandchill.app"

export const SHARE_HEADLINE = "Question For You 👀"

export const OG_DESCRIPTION =
  "Tap to answer this question on Convo & Chill"

/** Share link shown in WhatsApp — always bare domain, no www. */
export function getShareUrl(questionId: number): string {
  return `${SHARE_SITE_URL}/s/${questionId}`
}

export function buildShareMessage(
  promptText: string,
  questionId: number
): string {
  return `${SHARE_HEADLINE}\n\n${promptText}\n\n${getShareUrl(questionId)}`
}

export function buildShareUrl(questionId: number): string {
  return getShareUrl(questionId)
}

export function getServerShareUrl(questionId: number): string {
  return getShareUrl(questionId)
}

export function getOgTitle(promptText: string): string {
  const excerpt = promptText.slice(0, 60)
  return `${SHARE_HEADLINE} — ${excerpt}`
}

/** Absolute OG image URL — WhatsApp requires https:// with encoded query params. */
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
