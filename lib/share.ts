const DEFAULT_SITE_URL = "https://convoandchill.app"

export function buildShareUrl(origin: string, questionId: number): string {
  return `${origin.replace(/\/$/, "")}/s/${questionId}`
}

export function getServerShareUrl(questionId: number): string {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? DEFAULT_SITE_URL

  return `${base}/s/${questionId}`
}

export function getOgTitle(promptText: string): string {
  const excerpt =
    promptText.length > 60 ? `${promptText.slice(0, 60)}...` : promptText

  return `Convo & Chill — ${excerpt}`
}

export const OG_DESCRIPTION =
  "Tap to explore meaningful conversation prompts"
