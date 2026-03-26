import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import { cn } from "@/lib/utils"

export const Navbar = ({ className }: { className?: string }) => {
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md", className)}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-primary flex items-center justify-center">
            <Zap
              className="size-5 text-primary-foreground"
            />
          </div>
          <span className="text-xl font-bold tracking-tight">Flake</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground/80">
          <Link href="/#contracts" className="hover:text-foreground transition-colors">
            Contracts
          </Link>
          <Link href="https://github.com/scythe504/flake-stake-web" className="hover:text-foreground transition-colors" target="_blank">
            Source
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button size="sm" variant="default" asChild>
            <Link href="/vault">Launch App</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
