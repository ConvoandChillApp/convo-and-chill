"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"
import { useEffect } from "react"

type PostHogProviderProps = {
  children: React.ReactNode
}

function getAppEnvironment(): string {
  const hostname = window.location.hostname

  if (
    hostname === "convoandchill.app" ||
    hostname === "www.convoandchill.app"
  ) {
    return "production"
  }

  if (hostname.endsWith(".vercel.app")) {
    return "preview"
  }

  return "development"
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST

    if (!key || !host || posthog.__loaded) return

    posthog.init(key, {
      api_host: host,
      person_profiles: "identified_only",
      capture_pageview: true,
      capture_pageleave: true,
      loaded: (client) => {
        client.register({ app_environment: getAppEnvironment() })
      },
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
