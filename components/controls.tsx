import { ArrowLeft, ArrowRight, Share2 } from "lucide-react"

interface ControlsProps {
  onPrev: () => void
  onNext: () => void
  onShare: () => void
  disablePrev?: boolean
  disableNext?: boolean
  disableShare?: boolean
}

export function Controls({
  onPrev,
  onNext,
  onShare,
  disablePrev = false,
  disableNext = false,
  disableShare = false,
}: ControlsProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button
        type="button"
        aria-label="Previous question"
        onClick={onPrev}
        disabled={disablePrev}
        className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-40"
      >
        <ArrowLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Share question"
        onClick={onShare}
        disabled={disableShare}
        className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 via-purple-500 to-violet-600 text-white shadow-[0_8px_30px_-6px_rgba(217,70,239,0.7)] transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
      >
        <Share2 className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Next question"
        onClick={onNext}
        disabled={disableNext}
        className="flex size-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-colors hover:bg-white/10 disabled:pointer-events-none disabled:opacity-40"
      >
        <ArrowRight className="size-5" />
      </button>
    </div>
  )
}
