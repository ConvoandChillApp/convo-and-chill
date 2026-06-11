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
        className="flex size-12 items-center justify-center rounded-full bg-[#1A1A2E] transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
      >
        <ArrowLeft className="size-5 text-cyan-400" />
      </button>
      <button
        type="button"
        aria-label="Share question"
        onClick={onShare}
        disabled={disableShare}
        className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 text-white shadow-[0_8px_28px_-6px_rgba(236,72,153,0.75)] transition-transform hover:scale-105 disabled:pointer-events-none disabled:opacity-40"
      >
        <Share2 className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Next question"
        onClick={onNext}
        disabled={disableNext}
        className="flex size-12 items-center justify-center rounded-full bg-[#1A1A2E] transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-40"
      >
        <ArrowRight className="size-5 text-pink-400" />
      </button>
    </div>
  )
}
