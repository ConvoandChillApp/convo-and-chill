import { ImageResponse } from "@vercel/og"
import { categorySlug } from "@/lib/category-utils"

export const runtime = "edge"

const CATEGORY_EMOJI: Record<string, string> = {
  dating: "💕",
  controversial: "🔥",
  "after-dark": "😈",
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

function getCategoryEmoji(category: string): string {
  return CATEGORY_EMOJI[categorySlug(category)] ?? "✨"
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get("text") ?? "What will you ask tonight?"
  const category = searchParams.get("category") ?? "Convo & Chill"
  const displayText = truncateText(text, 100)
  const emoji = getCategoryEmoji(category)

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0D0D2B 0%, #4A0E8F 40%, #C026D3 70%, #EC4899 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "0.05em",
          }}
        >
          CONVO & CHILL
        </div>

        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 0",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 52,
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.25,
              maxWidth: "1000px",
            }}
          >
            {displayText}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 28,
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            {emoji} {category}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 22,
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            convoandchill.app
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
