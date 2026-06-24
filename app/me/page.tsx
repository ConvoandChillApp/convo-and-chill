"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, User } from "lucide-react"
import { BottomNav } from "@/components"

export default function ProfilePage() {
  return (
    <div className="min-h-dvh bg-[#0A0A0F]">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-4 pb-28 pt-6">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1 text-sm font-medium text-white/50 transition-colors hover:text-white/80"
        >
          Back to home
        </Link>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-[#1A1A2E] ring-1 ring-white/10">
            <User className="size-9 text-white/80" strokeWidth={1.75} />
          </div>

          <h1 className="mt-8 text-3xl font-bold tracking-tight text-white">
            Profile
          </h1>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#2A1A4E] px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-purple-300">
            <Clock className="size-3.5" aria-hidden="true" />
            COMING SOON
          </span>

          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/55">
            Profile pages are on the way. Check back soon to customize your
            experience and track your conversations.
          </p>

          <Image
            src="/logo.png"
            alt="Convo and Chill"
            width={120}
            height={32}
            className="mt-16 h-8 w-auto object-contain opacity-80"
          />
        </div>
      </main>

      <BottomNav active="me" />
    </div>
  )
}
