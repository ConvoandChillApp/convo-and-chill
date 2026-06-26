import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PostHogProvider } from "@/components/PostHogProvider";
import { SplashScreen } from "@/components/SplashScreen";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.convoandchill.app"),
  title: "Convo & Chill",
  description: "Conversation starters for every vibe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#0A0A0F] text-white`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!sessionStorage.getItem("convo-splash-shown")){document.documentElement.classList.add("splash-active")}}catch(e){document.documentElement.classList.add("splash-active")}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0A0F] text-white">
        <PostHogProvider>
          <div id="app-root" className="flex min-h-full flex-1 flex-col">
            {children}
          </div>
          <SplashScreen />
        </PostHogProvider>
      </body>
    </html>
  );
}
