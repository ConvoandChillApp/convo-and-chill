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
      className="fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-[#1a1a1a]/95 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md"
    >
      {message}
    </div>
  )
}
