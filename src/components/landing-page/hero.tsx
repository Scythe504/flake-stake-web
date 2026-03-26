import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Globe, Users } from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Background with new asset */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/v1016-b-09.jpg"
          alt="Flake ETH Staking Background"
          fill
          className="object-cover object-center opacity-90 dark:opacity-60"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-transparent to-background/90" />
        <div className="absolute inset-0 bg-background/10" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 backdrop-blur-md px-4 py-1.5 text-xs font-medium text-primary mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <Sparkles className="size-3.5" />
          <span>Next-gen ETH Staking</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Stake ETH. <br className="hidden md:block" />
          <span 
            className="bg-clip-text text-transparent bg-cover bg-center"
            style={{ backgroundImage: "url('/5479108.jpg')" }}
          >
            Earn Rewards.
          </span>
        </h1>

        <p className="mx-auto max-w-175 text-zinc-400 md:text-xl/relaxed lg:text-2xl/relaxed mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400 font-medium leading-relaxed">
          Mint your <span className="text-white font-semibold">flakeSBETH</span>—a soulbound receipt token. 
          Accrue <span className="text-white font-semibold">$FLAKE</span> and gamify your staking 
          reputation on the Ethereum network.
        </p>

        {/* Lido-inspired Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-225 mx-auto mb-12 py-6 px-8 rounded-3xl bg-zinc-950/40 backdrop-blur-xl border border-white/5 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-600">
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              <Zap className="size-3" />
              Total Staked
            </div>
            <div className="text-xl md:text-2xl font-bold text-white tracking-tight">1.2M ETH</div>
          </div>
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              <Globe className="size-3" />
              Active Stakers
            </div>
            <div className="text-xl md:text-2xl font-bold text-white tracking-tight">45,821</div>
          </div>
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              <Sparkles className="size-3" />
              Annual APR
            </div>
            <div className="text-xl md:text-2xl font-bold text-emerald-400 tracking-tight">4.2%</div>
          </div>
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              <Users className="size-3" />
              FLAKE Paid
            </div>
            <div className="text-xl md:text-2xl font-bold text-primary tracking-tight">$24.5M</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <Button size="lg" className="h-14 px-10 text-lg rounded-2xl shadow-2xl shadow-primary/40 hover:scale-[1.02] transition-transform" asChild>
            <Link href="/vault">Stake Now</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
