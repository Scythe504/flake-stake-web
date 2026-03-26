import { AlertCircle } from "lucide-react";

interface WrongChainAlertProps {
  isSupportedChain: boolean;
  isConnected: boolean;
}

export function WrongChainAlert({ isSupportedChain, isConnected }: WrongChainAlertProps) {
  if (isSupportedChain || !isConnected) return null;

  return (
    <div className="mb-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center gap-4 text-amber-500">
      <AlertCircle className="size-6 shrink-0" />
      <div className="flex-1">
        <p className="font-bold">Unsupported Network</p>
        <p className="text-sm opacity-80">
          Please switch to Ethereum Sepolia or Base Sepolia to use the staking vault.
        </p>
      </div>
    </div>
  );
}
