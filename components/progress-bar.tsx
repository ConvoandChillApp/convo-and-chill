interface ProgressProps {
  current: number
  total: number
}

export function ProgressBar({ current, total }: ProgressProps) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-semibold tabular-nums">
          <span className="text-pink-400">{current}</span>
          <span className="text-white/60"> / </span>
          <span className="text-white">{total}</span>
        </p>
        <span className="text-sm font-medium tabular-nums text-white/70">
          {percent}%
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-[#1A1A2E]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
