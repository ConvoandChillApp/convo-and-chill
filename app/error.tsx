"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0d0d0d] px-5 text-white"
      style={{ backgroundColor: "#0d0d0d", color: "#ffffff" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.4_0.18_300_/_0.35),transparent_65%)] blur-2xl"
      />

      <div className="relative z-10 w-full max-w-sm rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
        <h1 className="text-lg font-bold tracking-tight">CONVO &amp; CHILL</h1>
        <p className="mt-4 text-sm text-red-200">
          {error.message || "Something went wrong."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
