import { Fraunces, Inter } from "next/font/google"
import { ShopScreen } from "@/components/ShopScreen"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function ShopPage() {
  return (
    <div className={`${fraunces.variable} ${inter.variable}`}>
      <ShopScreen />
    </div>
  )
}
