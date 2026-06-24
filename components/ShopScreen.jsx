"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  MessageCircleHeart,
  PhoneOff,
  ShoppingBag,
  Smartphone,
} from "lucide-react"
import { BottomNav, Header } from "@/components"
import styles from "./ShopScreen.module.css"

const AMAZON_URL = "https://www.amazon.com/dp/B09RG1ZJM1"

const STATS = [
  { value: "50", label: "Cards" },
  { value: "2–10", label: "Players" },
  { value: "60–90 min", label: "Playtime" },
  { value: "18+", label: "Age" },
]

const FEATURES = [
  {
    icon: MessageCircleHeart,
    title: "Deeper than small talk",
    subtitle: "Questions designed to spark real connection",
    accent: "rose",
  },
  {
    icon: PhoneOff,
    title: "Phone-free connection",
    subtitle: "Put the screens down, stay present",
    accent: "gold",
  },
  {
    icon: Smartphone,
    title: "Pairs with the app",
    subtitle: "150+ more questions in your pocket",
    accent: "rose",
  },
]

export function ShopScreen() {
  const router = useRouter()

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.topBar}>
          <Header />
          <span className={styles.headerLabel}>Shop</span>
        </div>

        <section className={styles.hero}>
          <Image
            src="/card-game.jpg"
            alt="Convo and Chill After Dark card game"
            fill
            priority
            sizes="(max-width: 28rem) 100vw, 28rem"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} aria-hidden="true" />
          <div className={styles.heroGlow} aria-hidden="true" />
          <span className={`${styles.badge} ${styles.badgeAfterDark}`}>
            After Dark
          </span>
          <span className={`${styles.badge} ${styles.badgeAge}`}>18+</span>
        </section>

        <article className={styles.contentCard}>
          <div className={styles.titleBlock}>
            <h1 className={styles.productName}>Convo and Chill</h1>
            <p className={styles.productVariant}>After Dark Edition</p>
          </div>

          <p className={styles.tagline}>
            50 conversation cards for mental foreplay
          </p>

          <div className={styles.stats}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.features}>
            {FEATURES.map(({ icon: Icon, title, subtitle, accent }) => (
              <div key={title} className={styles.feature}>
                <span
                  className={`${styles.featureIcon} ${
                    accent === "gold" ? styles.featureIconGold : styles.featureIconRose
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className={styles.featureTitle}>{title}</p>
                  <p className={styles.featureSubtitle}>{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </main>

      <div className={styles.buyBar}>
        <Link
          href={AMAZON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <ShoppingBag className="size-5" aria-hidden="true" />
          Buy on Amazon
        </Link>
        <p className={styles.finePrint}>Opens in Amazon · Ships worldwide</p>
      </div>

      <BottomNav
        active="shop"
        onChange={(tab) => router.push(`/${tab}`)}
      />
    </div>
  )
}
