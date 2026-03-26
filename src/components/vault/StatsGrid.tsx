import { Card, CardContent } from "@/components/ui/card";
import { Lock, ShieldCheck, Coins, TrendingUp } from "lucide-react";
import { formatEther } from "viem";

interface StatsGridProps {
  totalStaked: bigint;
  stakedAmount: bigint;
  pendingRewards: bigint;
}

export function StatsGrid({ totalStaked, stakedAmount, pendingRewards }: StatsGridProps) {
  const stats = [
    {
      title: "Total Vault Value",
      value: `${parseFloat(formatEther(totalStaked)).toFixed(4)} ETH`,
      icon: Lock,
      description: "Total ETH across all users",
    },
    {
      title: "Your flakeSBETH",
      value: `${parseFloat(formatEther(stakedAmount)).toFixed(4)}`,
      icon: ShieldCheck,
      description: "Soulbound Reputation",
    },
    {
      title: "FLAKE Rewards",
      value: `${parseFloat(formatEther(pendingRewards)).toFixed(6)}`,
      icon: Coins,
      description: "Pending $FLAKE earnings",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-zinc-950/50 border-white/5 backdrop-blur-md rounded-3xl">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="size-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5">
                <stat.icon className="size-6 text-primary" />
              </div>
              <TrendingUp className="size-4 text-emerald-500" />
            </div>
            <div className="text-sm font-medium text-zinc-500 mb-1 uppercase tracking-wider">{stat.title}</div>
            <div className="text-3xl font-bold tracking-tight mb-1">{stat.value}</div>
            <div className="text-sm text-zinc-500">{stat.description}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
