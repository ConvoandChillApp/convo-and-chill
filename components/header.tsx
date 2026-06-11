import { User } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-base font-bold tracking-wide text-white sm:text-lg">
        CONVO AND CHILL
      </h1>
      <button
        type="button"
        aria-label="Profile"
        className="flex size-10 items-center justify-center rounded-full bg-[#1A1A2E]"
      >
        <User className="size-5 text-white/80" />
      </button>
    </header>
  )
}
