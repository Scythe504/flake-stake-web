import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";

export function ActivityCard() {
  return (
    <Card className="bg-zinc-950/50 border-white/5 backdrop-blur-md rounded-3xl overflow-hidden lg:col-span-2">
      <CardHeader className="p-8 pb-0">
        <div className="flex items-center gap-2 mb-2">
          <History className="size-5 text-primary" />
          <CardTitle className="text-2xl">Recent Activity</CardTitle>
        </div>
        <CardDescription className="text-zinc-400">Your recent staking transactions and reward claims.</CardDescription>
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
  );
}
