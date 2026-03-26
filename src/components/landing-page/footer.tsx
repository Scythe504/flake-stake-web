import Link from "next/link"
import { FaGithub } from "react-icons/fa6"

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
      <div className="container mx-auto px-4 mt-8 pt-8 border-t border-border/20 text-center text-xs text-muted-foreground">
        © 2026 Flake Platform. Experimental Staking Infrastructure.
      </div>
    </footer>
  )
}
