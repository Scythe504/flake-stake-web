"use client";

import { Card, CardContent } from "@/components/ui/card"
import { 
  Wallet, 
  Lock, 
  Coins,
  Globe,
  Zap,
  Shield,
  FileText,
  Award,
  ExternalLink,
  Copy
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { addressConfig } from "@/constants/addresses"
import { useState } from "react"

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
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null)

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 2000)
  }

  const networks = [
    {
      id: "sepolia",
      name: "Ethereum Sepolia",
      explorer: "https://sepolia.etherscan.io/address/",
      config: addressConfig.sepolia
    },
    {
      id: "base",
      name: "Base Sepolia",
      explorer: "https://sepolia.basescan.org/address/",
      config: addressConfig.base
    }
  ]

  const contractLabels = [
    { key: "proxyAddr", label: "Staking Contract (ERC1967-Proxy)", icon: Shield },
    { key: "implContract", label: "Staking Contract (Implementation)", icon: FileText },
    { key: "flakeEth", label: "flakeSBETH (Soulbound ETH)", icon: Coins },
    { key: "flakeToken", label: "$FLAKE Reward Token (ERC-20)", icon: Coins },
    { key: "achievementNft", label: "Achievement NFT (ERC-721)", icon: Award }
  ]

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

        {/* Current Deployment Section */}
        <div id="contracts" className="scroll-mt-24">
          <div className="text-center mb-10">
            <div className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-2">Current Deployment</div>
            <h3 className="text-2xl font-bold">Verified Contracts</h3>
          </div>

          <Tabs defaultValue="sepolia" className="w-full max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-zinc-900 border-white/5 h-12 p-1 rounded-xl">
                {networks.map((net) => (
                  <TabsTrigger 
                    key={net.id} 
                    value={net.id}
                    className="rounded-lg px-8 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground font-bold"
                  >
                    <div className={`size-2 rounded-full ${net.id === "sepolia" ? "bg-blue-500": "bg-emerald-500"} animate-pulse`}/>
                    {net.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {networks.map((net) => (
              <TabsContent key={net.id} value={net.id} className="mt-0 outline-none space-y-3">
                {contractLabels.map((item) => {
                  const address = net.config[item.key as keyof typeof net.config]
                  const explorerLink = `${net.explorer}${address}`
                  
                  return (
                    <div key={item.key} className="flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl bg-zinc-900/50 border border-white/5 group hover:border-primary/20 transition-colors gap-4">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-white/5 text-primary">
                          <item.icon className="size-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white mb-0.5">{item.label}</div>
                          <div className="text-[10px] font-mono text-zinc-500 break-all">{address}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(address)}
                          className="p-2 rounded-lg bg-zinc-900 border border-white/5 hover:bg-zinc-800 text-zinc-400 transition-colors relative"
                          title="Copy Address"
                        >
                          {copiedAddress === address && (
                            <span className="text-[10px] absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-2 py-1 rounded">Copied!</span>
                          )}
                          <Copy className="size-4" />
                        </button>
                        <a
                          href={explorerLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 text-primary transition-colors flex items-center gap-2 text-xs font-bold px-4"
                        >
                          Explorer
                          <ExternalLink className="size-3" />
                        </a>
                      </div>
                    </div>
                  )
                })}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
