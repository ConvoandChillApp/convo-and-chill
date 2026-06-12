const SHARE_SITE_URL = "https://convoandchill.app"

/** www subdomain — OG image crawlers won't follow 308 redirects from bare domain. */
const OG_SITE_URL = "https://www.convoandchill.app"

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
  return getShareUrl(questionId)
}

export function buildShareUrl(questionId: number): string {
  return getShareUrl(questionId)
}

export function getServerShareUrl(questionId: number): string {
  return getShareUrl(questionId)
}

export function getOgTitle(_promptText: string): string {
  return "Convo & Chill"
}

/** Absolute OG image URL — must use www to avoid redirect for WhatsApp crawlers. */
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

  return `${OG_SITE_URL}/api/og?${params.toString()}`
}
