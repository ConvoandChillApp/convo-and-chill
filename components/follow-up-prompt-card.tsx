interface FollowUpPromptCardProps {
  category: string
  question: string
}

export function FollowUpPromptCard({
  category,
  question,
}: FollowUpPromptCardProps) {
  return (
    <article className="flex h-full w-56 shrink-0 flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_12px_40px_-16px_oklch(0.4_0.18_300_/_0.5)] backdrop-blur-sm">
      <span className="inline-block w-fit rounded-full border border-white/10 bg-cc-pill px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cc-pill-text">
        {category}
      </span>
      <p className="mt-4 line-clamp-4 text-sm font-medium leading-snug text-white">
        {question}
      </p>
    </article>
  )
}
