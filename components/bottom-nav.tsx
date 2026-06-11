"use client"

import { Heart, Home, Settings } from "lucide-react"

const TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "saved", label: "Saved", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
] as const

interface BottomNavProps {
  active: string
  onSelect?: (tab: string) => void
  onChange?: (tab: string) => void
}

export function BottomNav({ active, onSelect, onChange }: BottomNavProps) {
  const handleTabChange = onChange ?? onSelect ?? (() => {})
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[#0d0d0d]/90 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-md items-center justify-around px-6 py-3">
        {TABS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleTabChange(id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-white" : "text-white/40 hover:text-white/70"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
