"use client"

import { Crown, Home, User } from "lucide-react"

const TABS = [
  { id: "home", label: "Home", icon: Home, activeColor: "text-cyan-400" },
  {
    id: "premium",
    label: "Premium",
    icon: Crown,
    activeColor: "text-amber-400",
  },
  { id: "me", label: "Me", icon: User, activeColor: "text-white" },
] as const

interface BottomNavProps {
  active: string
  onSelect?: (tab: string) => void
  onChange?: (tab: string) => void
}

export function BottomNav({ active, onSelect, onChange }: BottomNavProps) {
  const handleTabChange = onChange ?? onSelect ?? (() => {})

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/5 bg-[#0A0A0F]/95 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-md items-center justify-around px-6 py-3">
        {TABS.map(({ id, label, icon: Icon, activeColor }) => {
          const isActive = active === id
          const isPremium = id === "premium"

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleTabChange(id)}
              className={`relative flex flex-col items-center gap-1 transition-colors ${
                isPremium
                  ? "text-amber-400"
                  : isActive
                    ? activeColor
                    : "text-white/50 hover:text-white/80"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-medium">{label}</span>
              {isActive ? (
                <span
                  className={`absolute -bottom-1 h-0.5 w-6 rounded-full ${
                    isPremium
                      ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                      : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  }`}
                />
              ) : null}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
