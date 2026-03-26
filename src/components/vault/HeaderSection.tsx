import { Badge } from "@/components/ui/badge";
import { ConnectKitButton } from "connectkit";
import { Address } from "viem";

interface HeaderSectionProps {
  address?: Address;
}

export function HeaderSection({
  address,
}: HeaderSectionProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
      <div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Staking Dashboard</h1>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-600 text-primary border-primary/20 rounded-full py-1">
            Connected
          </Badge>
          <span className="text-zinc-500 font-mono text-sm">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </span>
        </div>
      </div>
      <ConnectKitButton />
    </div>
  );
}
