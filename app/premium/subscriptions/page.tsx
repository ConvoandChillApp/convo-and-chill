"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, Clock } from "lucide-react"

export default function PremiumSubscriptionsPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-[#0A0A0F] px-4 pb-10 pt-6">
      <Link
        href="/premium"
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-white/50 transition-colors hover:text-white/80"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Back
      </Link>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="flex size-20 items-center justify-center rounded-full bg-[#2A1A4E] ring-1 ring-purple-500/30">
          <Clock className="size-9 text-purple-300" strokeWidth={1.75} />
        </div>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-white">
          Premium Subscriptions
        </h1>

        <span className="mt-4 rounded-full bg-[#2A1A4E] px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-purple-300">
          COMING SOON
        </span>

        <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
          We&apos;re putting the finishing touches on CONVO+. Check back soon to
          unlock premium prompts and exclusive categories.
        </p>

        <button
          type="button"
          className="mt-10 w-full rounded-full border border-white/15 bg-transparent px-6 py-4 text-base font-medium text-white transition-colors hover:border-white/25 hover:bg-white/5"
        >
          Notify me when it&apos;s ready
        </button>

        <Image
          src="/logo.png"
          alt="Convo and Chill"
          width={120}
          height={32}
          className="mt-16 h-8 w-auto object-contain opacity-80"
        />
      </div>
    </main>
  )
}
