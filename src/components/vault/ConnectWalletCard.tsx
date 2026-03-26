import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { ConnectKitButton } from "connectkit";

export function ConnectWalletCard() {
  return (
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
  );
}
