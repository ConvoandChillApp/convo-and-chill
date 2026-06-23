import { ImageResponse } from "next/og"

export const runtime = "edge"

const OG_WIDTH = 1200
const OG_HEIGHT = 630

function truncateQuestion(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}…`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get("text") ?? "What will you ask tonight?"
  const displayText = truncateQuestion(text)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #0D0D2B 0%, #4A0E8F 45%, #C026D3 75%, #EC4899 100%)",
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "#FFFFFF",
            textTransform: "uppercase",
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
            textAlign: "center",
            padding: "24px 0",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: displayText.length > 70 ? 48 : 56,
              fontWeight: 700,
              color: "#FFFFFF",
              maxWidth: "980px",
              lineHeight: 1.25,
            }}
          >
            {displayText}
          </p>
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.92)",
          }}
        >
          convoandchill.app
        </div>
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    }
  )
}
