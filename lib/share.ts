const SHARE_SITE_URL = "https://convoandchill.app"

export const SHARE_HEADLINE = "Question For You 👀"

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
  const excerpt =
    promptText.length > 60 ? `${promptText.slice(0, 60)}...` : promptText

  return `Convo & Chill — ${excerpt}`
}

export const OG_DESCRIPTION =
  "Tap to explore meaningful conversation prompts"

/** Absolute OG image URL for WhatsApp large card previews. */
export function getOgImageUrl(
  promptText: string,
  categoryTitle: string
): string {
  const params = new URLSearchParams({
    text: promptText,
    category: categoryTitle,
  })

  return `${SHARE_SITE_URL}/api/og?${params.toString()}`
}
