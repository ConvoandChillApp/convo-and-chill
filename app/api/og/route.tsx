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
  const displayText = truncateText(text, 80)
  const emoji = getCategoryEmoji(category)

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(to top right, #0D0D2B 0%, #4A0E8F 40%, #C026D3 70%, #EC4899 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px",
        }}
      >
        <div
          style={{
            width: "100%",
            fontSize: 36,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
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
            width: "100%",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 64,
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
              lineHeight: 1.2,
              maxWidth: "1080px",
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
              fontSize: 32,
              fontWeight: 600,
              color: "#FFFFFF",
            }}
          >
            {emoji} {category}
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 28,
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
