interface QuestionCardProps {
  category: string
  question: string
}

export function QuestionCard({ category, question }: QuestionCardProps) {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-3 h-full rounded-3xl border border-white/5 bg-white/[0.02]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-2 top-1.5 h-full rounded-3xl border border-white/5 bg-white/[0.04]"
      />

      <article className="relative rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-[0_20px_60px_-20px_oklch(0.4_0.18_300_/_0.5)] backdrop-blur-sm">
        <span className="inline-block rounded-full border border-white/10 bg-cc-pill px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cc-pill-text">
          {category}
        </span>
        <p className="mt-6 text-2xl font-medium leading-snug tracking-tight text-white">
          {question}
        </p>
      </article>
    </div>
  )
}
