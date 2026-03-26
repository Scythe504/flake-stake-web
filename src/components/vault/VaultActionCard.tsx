import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownLeft, Coins, ArrowRight, Loader2 } from "lucide-react";
import { formatEther } from "viem";
import { useStake, useUnstake, useClaimRewards } from "@/hooks/useContracts";
import { TransactionModal } from "./TransactionModal";

interface VaultActionCardProps {
  ethBalance?: { value: bigint; symbol: string };
  stakedAmount: bigint;
  pendingRewards: bigint;
  isSupportedChain: boolean;
}

type TxType = "stake" | "unstake" | "claim" | null;

export function VaultActionCard({
  ethBalance,
  stakedAmount,
  pendingRewards,
  isSupportedChain,
}: VaultActionCardProps) {
  const [stakeAmount, setStakeAmount] = useState("");
  const [unstakeAmount, setUnstakeAmount] = useState("");
  const [activeTx, setActiveTx] = useState<TxType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stakeHook = useStake();
  const unstakeHook = useUnstake();
  const claimHook = useClaimRewards();

  // Reset inputs on confirmation
  useEffect(() => {
    if (stakeHook.isConfirmed) setStakeAmount("");
  }, [stakeHook.isConfirmed]);

  useEffect(() => {
    if (unstakeHook.isConfirmed) setUnstakeAmount("");
  }, [unstakeHook.isConfirmed]);

  // Handle Modal Open based on status
  useEffect(() => {
    if (activeTx === "stake") {
      if (stakeHook.status !== "idle") setIsModalOpen(true);
    } else if (activeTx === "unstake") {
      if (unstakeHook.status !== "idle") setIsModalOpen(true);
    } else if (activeTx === "claim") {
      if (claimHook.status !== "idle") setIsModalOpen(true);
    }
  }, [stakeHook.status, unstakeHook.status, claimHook.status, activeTx]);

  const handleStake = () => {
    setActiveTx("stake");
    stakeHook.stake(stakeAmount);
  };

  const handleUnstake = () => {
    setActiveTx("unstake");
    unstakeHook.unstake(unstakeAmount);
  };

  const handleClaim = () => {
    setActiveTx("claim");
    claimHook.claimRewards();
  };

  const getActiveStatus = () => {
    if (activeTx === "stake") {
      if (stakeHook.isConfirmed) return "success";
      if (stakeHook.isConfirming) return "confirming";
      if (stakeHook.isPending) return "pending";
      if (stakeHook.error) return "error";
    }
    if (activeTx === "unstake") {
      if (unstakeHook.isConfirmed) return "success";
      if (unstakeHook.isConfirming) return "confirming";
      if (unstakeHook.isPending) return "pending";
      if (unstakeHook.error) return "error";
    }
    if (activeTx === "claim") {
      if (claimHook.isConfirmed) return "success";
      if (claimHook.isConfirming) return "confirming";
      if (claimHook.isPending) return "pending";
      if (claimHook.error) return "error";
    }
    return "idle";
  };

  const getActiveHash = () => {
    if (activeTx === "stake") return stakeHook.hash;
    if (activeTx === "unstake") return unstakeHook.hash;
    if (activeTx === "claim") return claimHook.hash;
    return undefined;
  };

  const getActiveErrorString = () => {
    let err: { shortMessage?: string; message?: string } | null = null;
    if (activeTx === "stake") err = stakeHook.error as { shortMessage?: string; message?: string };
    else if (activeTx === "unstake") err = unstakeHook.error as { shortMessage?: string; message?: string };
    else if (activeTx === "claim") err = claimHook.error as { shortMessage?: string; message?: string };
    
    if (!err) return null;
    return err.shortMessage || err.message || "Unknown error";
  };

  return (
    <Card className="bg-zinc-950/50 border-white/5 backdrop-blur-md rounded-3xl overflow-hidden lg:col-span-2">
      <Tabs defaultValue="stake" className="w-full">
        <CardHeader className="p-8 pb-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl">Vault Operations</CardTitle>
            <CardDescription className="text-zinc-400">
              Manage your staked ETH and $FLAKE rewards.
            </CardDescription>
          </div>
          <TabsList className="bg-zinc-900 border-white/5 h-12 p-1 rounded-xl">
            <TabsTrigger value="stake" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Stake
            </TabsTrigger>
            <TabsTrigger value="unstake" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Unstake
            </TabsTrigger>
            <TabsTrigger value="claim" className="rounded-lg px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Claim
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent className="p-8">
          <TabsContent value="stake" className="mt-0 space-y-6 outline-none">
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
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-primary">ETH</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">You receive</span>
                  <div className="text-white font-medium">{stakeAmount || "0"} flakeSBETH</div>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Estimated APR</span>
                  <div className="text-emerald-400 font-bold">4.2%</div>
                </div>
              </div>

              <Button
                className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                disabled={!stakeAmount || stakeHook.isPending || stakeHook.isConfirming || !isSupportedChain}
                onClick={handleStake}
              >
                {stakeHook.isPending || stakeHook.isConfirming ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    {stakeHook.isConfirming ? "Confirming..." : "Pending..."}
                  </>
                ) : (
                  <>
                    Stake ETH
                    <ArrowUpRight className="ml-2 size-5" />
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="unstake" className="mt-0 space-y-6 outline-none">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-zinc-400">Amount to Unstake</label>
                  <span className="text-xs text-zinc-500">
                    Staked: {parseFloat(formatEther(stakedAmount)).toFixed(4)} flakeSBETH
                  </span>
                </div>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="h-14 bg-zinc-900 border-white/5 rounded-2xl pl-4 pr-20 text-lg font-medium"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-primary">SBETH</div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Release Penalty</span>
                  <div className="text-white font-medium">0%</div>
                </div>
                <div className="space-y-1 text-right">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Lock Status</span>
                  <div className="text-emerald-400 font-bold">Unlocked</div>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl text-lg font-bold border-white/10 hover:bg-white/5 transition-all"
                disabled={!unstakeAmount || unstakeHook.isPending || unstakeHook.isConfirming || !isSupportedChain}
                onClick={handleUnstake}
              >
                {unstakeHook.isPending || unstakeHook.isConfirming ? (
                  <>
                    <Loader2 className="mr-2 size-5 animate-spin" />
                    {unstakeHook.isConfirming ? "Confirming..." : "Pending..."}
                  </>
                ) : (
                  <>
                    Unstake Assets
                    <ArrowDownLeft className="ml-2 size-5" />
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="claim" className="mt-0 space-y-6 outline-none">
            <div className="flex flex-col items-center justify-center py-10 space-y-6">
              <div className="size-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 animate-pulse">
                <Coins className="size-12 text-primary" />
              </div>
              
              <div className="text-center space-y-2">
                <div className="text-sm text-zinc-500 uppercase tracking-widest font-bold">Claimable Rewards</div>
                <div className="text-5xl font-black tracking-tighter text-white">
                  {parseFloat(formatEther(pendingRewards)).toFixed(6)} <span className="text-primary text-2xl font-bold ml-1">FLAKE</span>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full h-16 rounded-2xl text-xl font-bold shadow-2xl shadow-primary/30"
                disabled={pendingRewards === BigInt(0) || claimHook.isPending || claimHook.isConfirming || !isSupportedChain}
                onClick={handleClaim}
              >
                {claimHook.isPending || claimHook.isConfirming ? (
                  <>
                    <Loader2 className="mr-2 size-6 animate-spin" />
                    {claimHook.isConfirming ? "Confirming..." : "Claiming..."}
                  </>
                ) : (
                  <>
                    Harvest $FLAKE
                    <ArrowRight className="ml-2 size-6" />
                  </>
                )}
              </Button>
              
              <p className="text-xs text-zinc-500 max-w-[280px] text-center">
                Rewards are calculated per block based on your total staked amount relative to the vault size.
              </p>
            </div>
          </TabsContent>
        </CardContent>
      </Tabs>

      <TransactionModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        status={getActiveStatus()}
        hash={getActiveHash()}
        error={getActiveErrorString()}
      />
    </Card>
  );
}
