import Link from "next/link"
import { FaGithub } from "react-icons/fa6"
import { AlertCircle } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="border-t py-12 bg-background/50">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
          <Link 
            href="https://github.com/scythe504/flake-staking-contracts" 
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="size-4" />
            Staking Contracts
          </Link>
          <Link 
            href="https://github.com/scythe504/flake-stake-web" 
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="size-4" />
            Web Platform
          </Link>
        </div>

        <div className="text-muted-foreground text-xs font-medium uppercase tracking-widest bg-muted px-3 py-1 rounded-full">
          Sepolia & Base Sepolia Only
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 text-[10px] text-amber-500/80 font-bold uppercase tracking-widest bg-amber-500/5 px-4 py-1.5 rounded-full border border-amber-500/10">
            <AlertCircle className="size-3" />
            Landing page stats are simulated. Real-time on-chain data is available in the Vault Dashboard.
          </div>
          <div className="text-[10px] text-muted-foreground/60">
            © 2026 Flake Platform. Experimental Soulbound Staking Infrastructure.
          </div>
        </div>
      </div>
    </footer>
  )
}
