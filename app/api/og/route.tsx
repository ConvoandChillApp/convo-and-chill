import { ImageResponse } from "next/og"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const text = searchParams.get("text") ?? "What will you ask tonight?"
  const _category = searchParams.get("category") ?? "Convo & Chill"

  const displayText =
    text.length > 80 ? `${text.slice(0, 80)}...` : text

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0D0D2B, #4A0E8F, #C026D3, #EC4899)",
          padding: "60px",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "#FFFFFF",
            marginBottom: "40px",
          }}
        >
          CONVO & CHILL
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 56,
              fontWeight: 700,
              color: "#FFFFFF",
              maxWidth: "1000px",
              lineHeight: 1.3,
            }}
          >
            {displayText}
          </p>
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#FFFFFF",
            marginTop: "40px",
          }}
        >
          convoandchill.app
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
