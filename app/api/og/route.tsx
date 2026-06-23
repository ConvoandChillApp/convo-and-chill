import { ImageResponse } from "next/og"
import { fetchQuestionById } from "@/lib/questions"

export const runtime = "edge"

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const INTER_BOLD_URL =
  "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYAZJhiJ-Ek-_EeAmXL.woff"

let fontPromise: Promise<ArrayBuffer> | null = null

function loadInterBold() {
  if (!fontPromise) {
    fontPromise = fetch(INTER_BOLD_URL).then((res) => res.arrayBuffer())
  }
  return fontPromise
}

function truncateQuestion(text: string, maxLength = 140): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength - 1).trimEnd()}…`
}

function questionFontSize(text: string): number {
  if (text.length > 100) return 44
  if (text.length > 70) return 50
  return 56
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const idParam = searchParams.get("id")
  const fallbackText = searchParams.get("text")

  let displayText = fallbackText ?? "What will you ask tonight?"

  if (idParam) {
    const questionId = Number(idParam)
    if (!Number.isNaN(questionId)) {
      const question = await fetchQuestionById(questionId)
      if (question?.promptText) {
        displayText = question.promptText
      }
    }
  }

  displayText = truncateQuestion(displayText)
  const fontSize = questionFontSize(displayText)
  const fontData = await loadInterBold()

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
          padding: "52px 72px",
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.16em",
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
            padding: "20px 0",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize,
              fontWeight: 700,
              color: "#FFFFFF",
              maxWidth: "980px",
              lineHeight: 1.22,
            }}
          >
            {displayText}
          </p>
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
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
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  )
}
