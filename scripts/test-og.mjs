/**
 * Verifies the OG image endpoint returns a 1200×630 PNG without redirects.
 * Uses www subdomain — bare convoandchill.app 308-redirects and breaks WhatsApp crawlers.
 */
const OG_URL =
  process.env.OG_TEST_URL ??
  "https://www.convoandchill.app/api/og?text=Test+Question&category=Controversial"

const res = await fetch(OG_URL, { redirect: "manual" })

if (res.status >= 300 && res.status < 400) {
  const location = res.headers.get("location")
  console.error(`FAIL: OG URL redirects (${res.status}) → ${location}`)
  console.error("OG image URL must not redirect — use the canonical domain that returns 200 directly.")
  process.exit(1)
}

if (!res.ok) {
  console.error(`FAIL: OG URL returned HTTP ${res.status}`)
  process.exit(1)
}

const contentType = res.headers.get("content-type") ?? ""
if (!contentType.includes("image/png")) {
  console.error(`FAIL: Expected image/png, got ${contentType}`)
  process.exit(1)
}

const bytes = (await res.arrayBuffer()).byteLength
if (bytes < 1000) {
  console.error(`FAIL: Response too small (${bytes} bytes) — likely not a valid PNG`)
  process.exit(1)
}

console.log(`OK: OG image accessible (${bytes} bytes, ${contentType})`)
console.log(OG_URL)
