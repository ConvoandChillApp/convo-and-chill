"use client"

import { useLayoutEffect, useState } from "react"
import Image from "next/image"
import styles from "./SplashScreen.module.css"

export const SPLASH_SESSION_KEY = "convo-splash-shown"
const VISIBLE_MS = 2000
const FADE_OUT_MS = 500

function clearSplashLock() {
  document.documentElement.classList.remove("splash-active")
}

export function SplashScreen() {
  const [phase, setPhase] = useState("hidden")

  useLayoutEffect(() => {
    if (sessionStorage.getItem(SPLASH_SESSION_KEY)) {
      clearSplashLock()
      return
    }

    sessionStorage.setItem(SPLASH_SESSION_KEY, "1")
    setPhase("visible")

    const fadeOutTimer = setTimeout(() => {
      setPhase("exit")
    }, VISIBLE_MS)

    const unmountTimer = setTimeout(() => {
      setPhase("hidden")
      clearSplashLock()
    }, VISIBLE_MS + FADE_OUT_MS)

    return () => {
      clearTimeout(fadeOutTimer)
      clearTimeout(unmountTimer)
    }
  }, [])

  if (phase === "hidden") {
    return null
  }

  return (
    <div
      className={`${styles.overlay} ${phase === "exit" ? styles.overlayExit : ""}`}
      aria-hidden="true"
    >
      <div className={styles.content}>
        <Image
          src="/logo.png"
          alt=""
          width={160}
          height={36}
          priority
          className={styles.logo}
        />
        <span className={styles.divider} aria-hidden="true" />
      </div>
    </div>
  )
}
