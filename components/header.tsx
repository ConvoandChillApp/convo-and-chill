import Image from "next/image"

export function Header() {
  return (
    <header className="flex items-center">
      <Image
        src="/logo.png"
        alt="Convo and Chill"
        width={160}
        height={36}
        className="h-9 w-auto object-contain"
        priority
      />
    </header>
  )
}
