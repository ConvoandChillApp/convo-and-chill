"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { Check, Crown, Sparkles } from "lucide-react"
import { BottomNav } from "@/components"
import { trackPaywallViewed } from "@/lib/analytics"

const FEATURES = [
  "Unlock After Dark & all premium categories",
  "Unlimited questions with no daily limits",
  "Exclusive deep conversation packs",
  "Ad-free experience",
]

export default function PremiumPage() {
  useEffect(() => {
    trackPaywallViewed()
  }, [])

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[#0A0A0F] px-4 pb-28 pt-6">
      <div className="flex flex-1 flex-col items-center text-center">
        <div className="mt-4 flex size-16 items-center justify-center rounded-full bg-amber-400/10 ring-1 ring-amber-400/30">
          <Crown className="size-8 text-amber-400" />
        </div>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-white">
          CONVO<span className="text-amber-400">+</span>
        </h1>
        <p className="mt-2 max-w-xs text-sm text-white/60">
          Upgrade your conversations with premium prompts and exclusive
          categories.
        </p>

        <div className="mt-8 w-full rounded-3xl border border-fuchsia-500/20 bg-gradient-to-br from-[#0D0D2B] via-[#4A0E8F]/40 to-[#C026D3]/30 p-6 shadow-[0_0_30px_rgba(192,38,211,0.15)]">
          <ul className="space-y-4 text-left">
            {FEATURES.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/15">
                  <Check className="size-3 text-cyan-400" />
                </span>
                <span className="text-sm text-white/90">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/premium/subscriptions"
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-purple-600 px-6 py-4 text-base font-semibold text-white shadow-[0_8px_28px_-6px_rgba(236,72,153,0.75)] transition-transform hover:scale-[1.02]"
        >
          <Sparkles className="size-5" />
          Start CONVO+ — $59 / year
        </Link>

        <p className="mt-3 text-xs font-medium text-white/40">
          Less than $5/month · Billed annually
        </p>

        <button
          type="button"
          className="mt-4 text-xs font-medium text-white/40 transition-colors hover:text-white/60"
        >
          Restore purchases
        </button>

        <Image
          src="/logo.png"
          alt="Convo and Chill"
          width={100}
          height={26}
          className="mt-10 h-7 w-auto object-contain opacity-80"
        />
      </div>

      <BottomNav />
    </main>
  )
}
