interface ToastProps {
  message: string
  visible: boolean
}

export function Toast({ message, visible }: ToastProps) {
  if (!visible) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-full border border-pink-500/30 bg-[#1A1A2E] px-4 py-2 text-sm font-medium text-white shadow-[0_0_16px_rgba(236,72,153,0.4)]"
    >
      {message}
    </div>
  )
}
