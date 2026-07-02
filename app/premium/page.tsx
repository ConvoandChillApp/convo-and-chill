"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import {
  Ban,
  Crown,
  Flame,
  Infinity,
  MessageCircleHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { BottomNav } from "@/components"
import { trackPaywallViewed } from "@/lib/analytics"

type MembershipFeature = {
  icon: LucideIcon
  title: string
  subtitle: string
  iconClassName: string
}

const MEMBERSHIP_FEATURES: MembershipFeature[] = [
  {
    icon: MessageCircleHeart,
    title: "300+ conversation starters",
    subtitle: "Perfect for any mood or moment",
    iconClassName: "text-pink-400",
  },
  {
    icon: Infinity,
    title: "Unlimited access",
    subtitle: "No daily limits. One full year of great conversations.",
    iconClassName: "text-fuchsia-400",
  },
  {
    icon: Flame,
    title: "Every premium category",
    subtitle: "Dating, After Dark, Friends, Game Nights & more",
    iconClassName: "text-orange-400",
  },
  {
    icon: Ban,
    title: "Ad-free experience",
    subtitle: "Stay focused on what matters most",
    iconClassName: "text-pink-400",
  },
  {
    icon: Sparkles,
    title: "New question packs",
    subtitle: "Added throughout the year",
    iconClassName: "text-purple-400",
  },
  {
    icon: ShieldCheck,
    title: "Cancel anytime",
    subtitle: "Manage your subscription easily in your app store",
    iconClassName: "text-violet-400",
  },
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

        <div className="relative mt-8 w-full overflow-hidden rounded-3xl border border-fuchsia-500/15 bg-gradient-to-br from-[#12081f] via-[#0a0612] to-[#150818] px-4 py-6 shadow-[0_0_30px_rgba(192,38,211,0.12)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(192,38,211,0.18), transparent 45%), radial-gradient(circle at 80% 70%, rgba(236,72,153,0.12), transparent 40%)",
            }}
          />

          <h2 className="relative text-base font-bold tracking-tight text-white sm:text-lg">
            Your CONVO+ Membership Includes
          </h2>

          <div className="relative mt-6 grid grid-cols-2 gap-y-6">
            {MEMBERSHIP_FEATURES.map((feature, index) => {
              const Icon = feature.icon
              const isLeftColumn = index % 2 === 0

              return (
                <div
                  key={feature.title}
                  className={`flex flex-col items-center px-2 text-center ${
                    isLeftColumn ? "border-r border-white/10" : ""
                  }`}
                >
                  <Icon
                    className={`mb-3 size-8 stroke-[1.75] ${feature.iconClassName}`}
                    aria-hidden="true"
                  />
                  <p className="text-[0.8125rem] font-bold leading-snug text-white">
                    {feature.title}
                  </p>
                  <p className="mt-1.5 text-[0.6875rem] leading-snug text-white/45">
                    {feature.subtitle}
                  </p>
                </div>
              )
            })}
          </div>
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
