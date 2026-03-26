import { useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { stakingAbi } from "@/constants/contracts";
import { Address, parseEther } from "viem";
import { addressConfig } from "@/constants/addresses";

export type StakeInfoReturn = readonly [
  bigint, // staked
  bigint, // pending
  bigint, // stakedBlockNum
  bigint, // stakedTimestamp
  boolean, // hasGenesis
  boolean, // hasWhale
  boolean // hasDiamondHands
];

export function useStakeInfo(address?: Address) {
  const stakingContract = useStakingContract();
  return useReadContract({
    ...stakingContract,
    functionName: "getStakeInfo",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
}

export function usePendingRewards(address?: Address) {
  const stakingContract = useStakingContract();
  return useReadContract({
    ...stakingContract,
    functionName: "pendingRewards",
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
}

export function useTotalStaked() {
  const stakingContract = useStakingContract();
  return useReadContract({
    ...stakingContract,
    functionName: "totalStaked",
  });
}

export function useStake() {
  const stakingContract = useStakingContract();
  const { writeContract: mutate, data: hash, error, isPending, status } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const stake = (amount: string) => {
    if (!amount || isNaN(Number(amount))) return;
    mutate({
      ...stakingContract,
      functionName: "stake",
      value: parseEther(amount),
      args: [parseEther(amount)],
    });
  };

  return { stake, isPending, status, isConfirming, isConfirmed, hash, error };
}

export function useUnstake() {
  const stakingContract = useStakingContract();
  const { writeContract: mutate, data: hash, error, isPending, status } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const unstake = (amount: string) => {
    if (!amount || isNaN(Number(amount))) return;
    mutate({
      ...stakingContract,
      functionName: "unstake",
      args: [parseEther(amount)],
    });
  };

  return { unstake, isPending, status, isConfirming, isConfirmed, hash, error };
}

export function useClaimRewards() {
  const stakingContract = useStakingContract();
  const { writeContract: mutate, data: hash, error, isPending, status } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const claimRewards = () => {
    mutate({
      ...stakingContract,
      functionName: "claimRewards",
      args: [],
    });
  };

  return { claimRewards, isPending, status, isConfirming, isConfirmed, hash, error };
}

export function useStakingContract() {
  const chainId = useChainId();

  const chainKey = chainId === 11155111 ? "sepolia" : "base";
  const address = (addressConfig[chainKey]?.proxyAddr as Address) || "0x0";

  return {
    address,
    abi: stakingAbi,
  };
}
