import Image from "next/image"
import { User } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <Image
        src="/logo.png"
        alt="Convo and Chill"
        width={160}
        height={36}
        className="h-9 w-auto object-contain"
        priority
      />
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
