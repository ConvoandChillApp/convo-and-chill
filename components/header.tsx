import { User } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-lg font-bold tracking-tight text-white">
        CONVO &amp; CHILL
      </h1>
      <button
        type="button"
        aria-label="Profile"
        className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
      >
        <User className="size-5 text-white/70" />
      </button>
    </header>
  )
}
