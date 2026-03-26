import { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Web3Provider } from "@/components/web3-provider"
import { cn } from "@/lib/utils";

const spaceGrotesk = Space_Grotesk({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Flake | Soulbound Staking & On-chain Reputation",
  description: "Stake ETH, earn $FLAKE, and build your on-chain reputation with non-transferable soulbound tokens. Experience the future of decentralized staking on Sepolia and Base Sepolia.",
  keywords: ["ETH Staking", "Soulbound Tokens", "Web3 Reputation", "Sepolia", "Base Sepolia", "DeFi", "Flake"],
  authors: [{ name: "Flake Platform" }],
  openGraph: {
    title: "Flake | Soulbound Staking",
    description: "Build your on-chain reputation through ETH staking. Earn $FLAKE and collect unique soulbound achievements.",
    url: "https://flake-stake.vercel.app",
    siteName: "Flake",
    images: [
      {
        url: "/whale.png",
        width: 800,
        height: 800,
        alt: "Flake Soulbound Staking",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Flake | Soulbound Staking",
    description: "Stake ETH, earn $FLAKE, and build your on-chain reputation.",
    images: ["/whale.png"],
  },
  icons: {
    icon: "/favicon.ico",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", spaceGrotesk.variable)}
    >
      <body>
        <Web3Provider>
          <ThemeProvider>{children}</ThemeProvider>
        </Web3Provider>
      </body>
    </html>
  )
}
