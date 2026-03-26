"use client";

import { useAccount, useBalance, useChainId } from "wagmi";
import { Navbar } from "@/components/landing-page/navbar";
import { Footer } from "@/components/landing-page/footer";
import { 
  useStakeInfo, 
  useTotalStaked, 
  StakeInfoReturn
} from "@/hooks/useContracts";

import { WrongChainAlert } from "@/components/vault/WrongChainAlert";
import { HeaderSection } from "@/components/vault/HeaderSection";
import { StatsGrid } from "@/components/vault/StatsGrid";
import { ConnectWalletCard } from "@/components/vault/ConnectWalletCard";
import { VaultActionCard } from "@/components/vault/VaultActionCard";

export default function AppDashboard() {
  const { isConnected, address } = useAccount();
  const chainId = useChainId();
  const { data: ethBalance } = useBalance({ address });

  const isSupportedChain = chainId === 11155111 || chainId === 84532;

  const { data: stakeInfo } = useStakeInfo(address);
  const { data: totalStakedData } = useTotalStaked();

  const typedStakeInfo = stakeInfo as unknown as StakeInfoReturn;
  const stakedAmount = Array.isArray(typedStakeInfo) ? typedStakeInfo[0] : BigInt(0);
  const pendingRewards = Array.isArray(typedStakeInfo) ? typedStakeInfo[1] : BigInt(0);
  const totalStaked = (totalStakedData as bigint) || BigInt(0);

  if (!isConnected) {
    return (
      <div className="flex flex-col min-h-svh bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <ConnectWalletCard />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-svh bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <WrongChainAlert isSupportedChain={isSupportedChain} isConnected={isConnected} />

        <HeaderSection 
          address={address}
        />

        <StatsGrid 
          totalStaked={totalStaked}
          stakedAmount={stakedAmount}
          pendingRewards={pendingRewards}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VaultActionCard 
            ethBalance={ethBalance}
            stakedAmount={stakedAmount}
            pendingRewards={pendingRewards}
            isSupportedChain={isSupportedChain}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
