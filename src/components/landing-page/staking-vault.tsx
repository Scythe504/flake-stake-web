import { Card, CardContent } from "@/components/ui/card"
import { 
  Wallet, 
  Lock, 
  Coins,
  Globe,
  Zap
} from "lucide-react"

const VAULT_STEPS = [
  {
    title: "Stake ETH",
    description: "Deposit your ETH into our secure, high-yield staking vault on supported testnets.",
    icon: Wallet,
    accent: "bg-blue-500/10 text-blue-500 border-blue-500/20"
  },
  {
    title: "Receive flakeSBETH",
    description: "Instantly mint your Soulbound receipt token, representing your staked position and reputation.",
    icon: Lock,
    accent: "bg-primary/10 text-primary border-primary/20"
  },
  {
    title: "Accrue FLAKE",
    description: "Earn $FLAKE rewards automatically. Our ERC-20 token represents your staking contribution.",
    icon: Coins,
    accent: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
  },
]

export const StakingVault = () => {
  return (
    <section id="vault" className="py-24 sm:py-32 bg-zinc-950 text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-150 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-xs font-bold uppercase tracking-widest text-zinc-400 mb-6">
              <Globe className="size-3" />
              Sepolia & Base Sepolia Only
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              The Next Standard for <br />
              <span className="text-primary italic">Liquid Staking.</span>
            </h2>
            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed">
              Flake is a simplified staking vault built for the next generation of Ethereum enthusiasts. 
              Operates exclusively on <span className="text-white font-semibold">Sepolia</span> and <span className="text-white font-semibold">Base Sepolia</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:max-w-md">
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 backdrop-blur-md">
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Zap className="size-3" />
                APR
              </div>
              <div className="text-3xl font-bold text-emerald-400 tracking-tighter">4.2%</div>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5 backdrop-blur-md">
              <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                <Globe className="size-3" />
                Network
              </div>
              <div className="text-3xl font-bold text-white tracking-tighter">Multi-L2</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {VAULT_STEPS.map((step, index) => (
            <Card key={index} className="bg-zinc-900/40 border-white/5 backdrop-blur-sm rounded-3xl group hover:border-primary/20 transition-all">
              <CardContent className="p-8">
                <div className={`size-14 rounded-2xl flex items-center justify-center mb-8 border transition-transform duration-300 group-hover:scale-110 ${step.accent}`}>
                  <step.icon className="size-6" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Network Badge */}
        <div id="contracts" className="flex flex-col items-center justify-center p-8 border border-white/5 rounded-3xl bg-zinc-900/30 text-center scroll-mt-24">
          <div className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">Current Deployment</div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 text-sm font-medium bg-zinc-950 px-4 py-2 rounded-xl border border-white/5">
              <div className="size-2 rounded-full bg-emerald-500" />
              Ethereum Sepolia
            </div>
            <div className="flex items-center gap-2 text-sm font-medium bg-zinc-950 px-4 py-2 rounded-xl border border-white/5">
              <div className="size-2 rounded-full bg-blue-500" />
              Base Sepolia
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
