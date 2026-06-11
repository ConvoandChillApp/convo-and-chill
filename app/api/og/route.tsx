import { ImageResponse } from "@vercel/og"
import { categorySlug } from "@/lib/category-utils"

export const runtime = "edge"

const CATEGORY_EMOJI: Record<string, string> = {
  dating: "💕",
  controversial: "🔥",
  "after-dark": "😈",
}

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "https://convoandchill.app"

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
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          backgroundColor: "#0A0A0F",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #0D0D2B 0%, #4A0E8F 45%, #C026D3 75%, #EC4899 100%)",
            opacity: 0.9,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={`${SITE_URL}/logo.png`}
              alt="Convo & Chill"
              height={40}
              style={{ height: 40, objectFit: "contain" }}
            />
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
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
