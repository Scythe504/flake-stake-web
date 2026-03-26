import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Loader2, 
  XCircle,
  Hash
} from "lucide-react";
import { useState } from "react";
import { useChainId } from "wagmi";

interface TransactionModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  status: "idle" | "pending" | "confirming" | "success" | "error";
  hash?: string;
  error?: string | null;
}

export function TransactionModal({ 
  isOpen, 
  onOpenChange, 
  status, 
  hash, 
  error 
}: TransactionModalProps) {
  const [copied, setCopied] = useState(false);
  const chainId = useChainId();

  // Prevent closing if we are in a state without a hash yet, 
  // unless there's an error.
  const canClose = !!hash || status === "error" || status === "success" || status === "idle";

  const getExplorerUrl = () => {
    if (!hash) return "#";
    const baseUrl = chainId === 11155111 
      ? "https://sepolia.etherscan.io" 
      : "https://sepolia.basescan.org";
    return `${baseUrl}/tx/${hash}`;
  };

  const handleCopy = () => {
    if (hash) {
      navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && !canClose) return;
    // Decouple from event loop to avoid flushSync issues in some React/Radix versions
    setTimeout(() => onOpenChange(open), 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent 
        showCloseButton={false}
        onPointerDownOutside={(e) => { if (!canClose) e.preventDefault(); }}
        onEscapeKeyDown={(e) => { if (!canClose) e.preventDefault(); }}
        className="bg-zinc-950 border-white/5 sm:max-w-[425px] rounded-3xl p-8 backdrop-blur-xl outline-none ring-0 shadow-2xl"
      >
        <DialogHeader className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex justify-center">
            {status === "confirming" || status === "pending" ? (
              <div className="size-16 rounded-3xl bg-primary/10 flex items-center justify-center border border-primary/20 animate-pulse">
                <Loader2 className="size-8 text-primary animate-spin" />
              </div>
            ) : status === "success" ? (
              <div className="size-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <CheckCircle2 className="size-8 text-emerald-500" />
              </div>
            ) : status === "error" ? (
              <div className="size-16 rounded-3xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                <XCircle className="size-8 text-rose-500" />
              </div>
            ) : null}
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight">
            {status === "confirming" ? "Confirming on-chain..." : 
             status === "pending" ? "Waiting for Approval" :
             status === "success" ? "Transaction Success!" : 
             status === "error" ? "Transaction Failed" : "Transaction Status"}
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-sm leading-relaxed">
            {status === "confirming" ? "Your transaction is being included in a block. This usually takes a few seconds." : 
             status === "pending" ? "Please confirm the transaction in your wallet." :
             status === "success" ? "The vault has been updated successfully with your assets." : 
             status === "error" ? (error || "An unexpected error occurred during the transaction.") : 
             ""}
          </DialogDescription>
        </DialogHeader>

        {hash && (
          <div className="mt-8 space-y-4">
            <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
                <Hash className="size-3" />
                Transaction Hash
              </div>
              <div className="flex items-center justify-between gap-3">
                <code className="text-xs font-mono text-zinc-300 truncate max-w-[240px]">
                  {hash}
                </code>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="size-8 rounded-lg hover:bg-white/5 text-zinc-400"
                  onClick={handleCopy}
                >
                  {copied ? <CheckCircle2 className="size-4 text-emerald-500" /> : <Copy className="size-4" />}
                </Button>
              </div>
            </div>

            <Button 
              asChild
              className="w-full h-12 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all font-medium"
            >
              <a href={getExplorerUrl()} target="_blank" rel="noopener noreferrer">
                View on Explorer
                <ExternalLink className="ml-2 size-4" />
              </a>
            </Button>
          </div>
        )}

        <DialogFooter className="mt-4 border-none bg-transparent p-0 flex flex-col sm:flex-col gap-2">
          <Button 
            onClick={() => handleOpenChange(false)}
            disabled={!canClose}
            className="w-full h-12 rounded-2xl font-bold bg-primary hover:scale-[1.01] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "success" ? "Awesome" : status === "error" ? "Dismiss" : "Close"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
