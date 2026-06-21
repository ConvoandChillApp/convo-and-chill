"use client"

import { usePathname, useRouter } from "next/navigation"
import { Crown, Home, ShoppingBasket, User } from "lucide-react"

const SHOP_URL = "https://linktr.ee/convoandchill"

type TabConfig = {
  id: string
  label: string
  icon: typeof Home
  href: string | null
  activeColor: string
  accentColor: string
  alwaysAccent?: boolean
  external?: boolean
}

const TABS: TabConfig[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: "/",
    activeColor: "text-cyan-400",
    accentColor: "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]",
  },
  {
    id: "premium",
    label: "Premium",
    icon: Crown,
    href: "/premium",
    activeColor: "text-amber-400",
    accentColor: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    alwaysAccent: true,
  },
  {
    id: "shop",
    label: "Shop",
    icon: ShoppingBasket,
    href: SHOP_URL,
    activeColor: "text-emerald-400",
    accentColor: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    alwaysAccent: true,
    external: true,
  },
  {
    id: "me",
    label: "Me",
    icon: User,
    href: null,
    activeColor: "text-white",
    accentColor: "bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]",
  },
]

function getActiveTab(pathname: string): string {
  if (pathname.startsWith("/premium")) return "premium"
  if (pathname.startsWith("/me")) return "me"
  return "home"
}

interface BottomNavProps {
  active?: string
  onSelect?: (tab: string) => void
  onChange?: (tab: string) => void
}

export function BottomNav({ active, onSelect, onChange }: BottomNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const resolvedActive = active ?? getActiveTab(pathname)
  const legacyHandler = onChange ?? onSelect

  function handleTabClick(
    tabId: string,
    href: string | null,
    external?: boolean
  ) {
    if (href) {
      if (external) {
        window.open(href, "_blank", "noopener,noreferrer")
        return
      }

      router.push(href)
      return
    }

    legacyHandler?.(tabId)
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/5 bg-[#0A0A0F]/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-md items-center justify-around px-6 py-3">
        {TABS.map(({ id, label, icon: Icon, href, activeColor, accentColor, alwaysAccent, external }) => {
          const isActive = resolvedActive === id
          const useAccentColor = alwaysAccent || isActive

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleTabClick(id, href, external)}
              className={`relative flex flex-col items-center gap-1 transition-colors ${
                useAccentColor ? activeColor : "text-white/50 hover:text-white/80"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-medium">{label}</span>
              {isActive ? (
                <span
                  className={`absolute -bottom-1 h-0.5 w-6 rounded-full ${accentColor}`}
                />
              ) : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
