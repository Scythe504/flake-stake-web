import { useChainId, useReadContract, useWriteContract } from "wagmi";
import { stakingAbi, StakingAbi } from "@/constants/contracts"
import { Address, parseEther } from "viem";
import { addressConfig } from "@/constants/addresses";

export function useStakeInfo(address: Address,) {
  const stakingContract = useStakingContract()
  return useReadContract({
    ...stakingContract,
    functionName: "getStakeInfo",
    args: [address]
  })
}

export function usePendingRewards(address: Address,) {
  const stakingContract = useStakingContract();
  return useReadContract({
    ...stakingContract,
    functionName: "pendingRewards",
    args: [address]
  })
}

export function useTotalStaked() {
  const stakingContract = useStakingContract();
  return useReadContract({
    ...stakingContract,
    functionName: "totalStaked"
  })
}

export function useStake() {
  const stakingContract = useStakingContract();
  const { mutate, isPending, isSuccess } = useWriteContract();

  const stake = (amount: string) => {
    mutate({
      ...stakingContract,
      functionName: "stake",
      value: parseEther(amount),
      args: [parseEther(amount)]
    })
  }

  return { stake, isPending, isSuccess };
}

export function useUnstake() {
  const chainId = useChainId()
  const stakingContract = useStakingContract();
  const { mutate, isPending, isSuccess } = useWriteContract();

  const unstake = (amount: string) => {
    mutate({
      ...stakingContract,
      functionName: "unstake",
      args: [parseEther(amount)]
    })
  }

  return { unstake, isPending, isSuccess };
}

export function useClaimRewards() {
  const stakingContract = useStakingContract();
  const { mutate, isPending, isSuccess } = useWriteContract();

  const claimRewards = () => {
    mutate({
      ...stakingContract,
      functionName: "claimRewards",
      args: [],
    })
  }

  return { claimRewards, isPending, isSuccess };
}

export function useStakingContract(): {
  address: Address;
  abi: StakingAbi;
} {
  const chainId = useChainId();

  const chain = chainId === 11155111 ? 'sepolia' : 'base'

  return {
    address: addressConfig[chain].proxyAddr,
    abi: stakingAbi
  }
}


