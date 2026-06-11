import Link from "next/link"

export default function SharedQuestionNotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0d0d0d]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.4_0.18_300_/_0.35),transparent_65%)] blur-2xl"
      />

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center px-5 py-6 text-center">
        <h1 className="text-lg font-bold tracking-tight text-white">
          CONVO &amp; CHILL
        </h1>
        <p className="mt-8 text-sm text-white/60">
          This conversation starter could not be found.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-full bg-gradient-to-br from-[oklch(0.62_0.27_330)] to-[oklch(0.55_0.24_295)] px-8 py-3 text-sm font-semibold text-white shadow-[0_8px_30px_-6px_oklch(0.62_0.27_330_/_0.7)] transition-transform hover:scale-105"
        >
          Explore more prompts
        </Link>
      </main>
    </div>
  )
}
