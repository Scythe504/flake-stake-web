"use client";

import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { ConnectKitButton } from "connectkit";
import { Navbar } from "@/components/landing-page/navbar";
import { Footer } from "@/components/landing-page/footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, 
  ArrowRight, 
  Coins, 
  Lock, 
  TrendingUp, 
  ShieldCheck,
  History
} from "lucide-react";
import { formatEther } from "viem";

export default function AppDashboard() {
  const { isConnected, address } = useAccount();
  const { data: ethBalance } = useBalance({ address });
  const [stakeAmount, setStakeAmount] = useState("");

  const stats = [
    {
      title: "Total Staked",
      value: "0.00 ETH",
      icon: Lock,
      description: "Total ETH in vault"
    },
    {
      title: "flakeSBETH",
      value: "0.00",
      icon: ShieldCheck,
      description: "Soulbound Reputation"
    },
    {
      title: "FLAKE Rewards",
      value: "0.00",
      icon: Coins,
      description: "Pending $FLAKE"
    }
  ];

  if (!isConnected) {
    return (
      <div className="flex flex-col min-h-svh bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full border-white/5 bg-zinc-950/50 backdrop-blur-xl rounded-3xl p-8 text-center">
            <div className="size-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-8 border border-primary/20">
              <Wallet className="size-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Connect Wallet</h1>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              To access your staking vault and manage your assets, please connect your wallet.
            </p>
            <div className="flex justify-center">
              <ConnectKitButton />
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Staking Dashboard</h1>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 rounded-full py-1">
                Connected
              </Badge>
              <span className="text-zinc-500 font-mono text-sm">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
            </div>
          </div>
          <ConnectKitButton />
        </div>

        {/* Stats Grid */}
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Staking Action Card */}
          <Card className="bg-zinc-950/50 border-white/5 backdrop-blur-md rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <CardTitle className="text-2xl">Stake Ethereum</CardTitle>
              <CardDescription className="text-zinc-400">
                Deposit ETH into the vault to receive flakeSBETH and earn FLAKE rewards.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-medium text-zinc-400">Amount to Stake</label>
                    <span className="text-xs text-zinc-500">
                      Balance: {ethBalance ? parseFloat(formatEther(ethBalance.value)).toFixed(4) : "0.00"} ETH
                    </span>
                  </div>
                  <div className="relative">
                    <Input 
                      type="number" 
                      placeholder="0.00" 
                      className="h-14 bg-zinc-900 border-white/5 rounded-2xl pl-4 pr-20 text-lg font-medium"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-primary">
                      ETH
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">You will receive</span>
                    <span className="text-white font-medium">{stakeAmount || "0"} flakeSBETH</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-400">Staking APR</span>
                    <span className="text-emerald-400 font-bold">4.2%</span>
                  </div>
                  <div className="flex justify-between items-center text-sm border-t border-white/5 pt-4">
                    <span className="text-zinc-400">Transaction Status</span>
                    <span className="text-zinc-500 italic">Ready to Stake</span>
                  </div>
                </div>

                <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform">
                  Stake ETH
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* History/Activity Card */}
          <Card className="bg-zinc-950/50 border-white/5 backdrop-blur-md rounded-3xl overflow-hidden">
            <CardHeader className="p-8 pb-0">
              <div className="flex items-center gap-2 mb-2">
                <History className="size-5 text-primary" />
                <CardTitle className="text-2xl">Recent Activity</CardTitle>
              </div>
              <CardDescription className="text-zinc-400">
                Your recent staking transactions and reward claims.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center py-12 text-zinc-500 space-y-4">
                <div className="size-16 rounded-full bg-zinc-900/50 flex items-center justify-center border border-white/5">
                  <History className="size-8 opacity-20" />
                </div>
                <p className="text-sm font-medium">No activity yet</p>
                <p className="text-xs text-center max-w-[200px]">
                  Your staking history will appear here once you start staking.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
