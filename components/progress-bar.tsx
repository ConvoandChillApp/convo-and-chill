interface ProgressProps {
  current: number
  total: number
}

export function Progress({ current, total }: ProgressProps) {
  const percent = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-600 transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs font-medium tabular-nums text-white/60">
        {current} / {total}
      </span>
    </div>
  )
}
