import { Navbar } from "@/components/landing-page/navbar"
import { Hero } from "@/components/landing-page/hero"
import { StakingVault } from "@/components/landing-page/staking-vault"
import { Footer } from "@/components/landing-page/footer"

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh bg-background selection:bg-primary/20 antialiased">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StakingVault />
      </main>
      <Footer />
    </div>
  )
}
