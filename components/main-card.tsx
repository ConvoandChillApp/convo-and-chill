export type MainCardQuestion = {
  text: string
  category?: string
}

interface MainCardProps {
  question: MainCardQuestion
}

export function MainCard({ question }: MainCardProps) {
  return (
    <div className="relative mx-auto w-full">
      <div
        aria-hidden="true"
        className="absolute inset-x-4 top-3 h-full rounded-3xl bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 blur-sm"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-2 top-1.5 h-full rounded-3xl bg-gradient-to-br from-violet-600/30 to-fuchsia-600/30 blur-[2px]"
      />

      <article className="relative overflow-hidden rounded-3xl border border-white/10 p-8 shadow-[0_20px_60px_-20px_rgba(168,85,247,0.45)] backdrop-blur-md">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/40 via-fuchsia-600/30 to-orange-500/30" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10">
          {question.category ? (
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/90">
              {question.category}
            </span>
          ) : null}
          <p className="mt-6 text-2xl font-medium leading-snug tracking-tight text-white">
            {question.text}
          </p>
        </div>
      </article>
    </div>
  )
}
