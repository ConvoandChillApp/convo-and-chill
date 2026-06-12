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
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0D0D2B 0%, #4A0E8F 35%, #C026D3 65%, #EC4899 100%)",
          position: "relative",
          padding: "60px",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              color: "#FFFFFF",
              fontSize: 32,
              letterSpacing: "3px",
            }}
          >
            CONVO & CHILL
          </div>
          <div
            style={{
              color: "#FFFFFF",
              fontSize: 28,
            }}
          >
            {emoji} {category}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            padding: "40px 0",
            width: "100%",
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              color: "#FFFFFF",
              fontSize: 62,
              textAlign: "center",
              lineHeight: 1.3,
              maxWidth: "1000px",
            }}
          >
            {displayText}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#FFFFFF",
              opacity: 0.7,
              fontSize: 26,
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
      headers: {
        "Content-Type": "image/png",
      },
    }
  )
}
