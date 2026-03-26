import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Trophy, Star, Crown, Gem, LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: string;
  image: string;
  unlocked: boolean;
  icon: LucideIcon;
}

interface AchievementsSectionProps {
  hasGenesis: boolean;
  hasWhale: boolean;
  hasDiamondHands: boolean;
}

export function AchievementsSection({
  hasGenesis,
  hasWhale,
  hasDiamondHands,
}: AchievementsSectionProps) {
  const achievements: Achievement[] = [
    {
      id: "genesis",
      name: "Genesis Staker",
      description: "A pioneer of the Flake ecosystem.",
      requirement: "Unlocked on your very first ETH stake.",
      image: "/genesis-stake.png",
      unlocked: hasGenesis,
      icon: Star,
    },
    {
      id: "whale",
      name: "The Whale",
      description: "Significant capital contribution.",
      requirement: "Stake more than 1.0 ETH in a single transaction.",
      image: "/whale.png",
      unlocked: hasWhale,
      icon: Crown,
    },
    {
      id: "diamond",
      name: "Diamond Hands",
      description: "Unwavering conviction in the vault.",
      requirement: "Hold your stake for more than 7 days without unstaking.",
      image: "/diamond-hands.png",
      unlocked: hasDiamondHands,
      icon: Gem,
    },
  ];

  return (
    <section className="mt-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <Trophy className="size-5 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">On-chain Reputation</h2>
          <p className="text-sm text-zinc-500">Collect non-transferable Soulbound NFTs for your achievements.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={cn(
              "bg-zinc-950/50 border-white/5 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-500",
              achievement.unlocked ? "border-primary/20 bg-primary/5" : "opacity-80"
            )}
          >
            <div className="relative aspect-square w-full">
              {/* Achievement Image */}
              <Image
                src={achievement.image}
                alt={achievement.name}
                fill
                className={cn(
                  "object-cover transition-all duration-700 px-3",
                  !achievement.unlocked && "blur-xl scale-110 grayscale"
                )}
              />
              
              {/* Overlay for Locked State */}
              {!achievement.unlocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="size-16 rounded-full bg-zinc-900/80 flex items-center justify-center border border-white/10 mb-4 shadow-2xl">
                    <Lock className="size-8 text-zinc-500" />
                  </div>
                  <Badge variant="outline" className="bg-zinc-950/80 text-zinc-400 border-white/10 font-bold uppercase tracking-widest text-[10px] py-1">
                    Locked
                  </Badge>
                </div>
              )}

              {/* Status Badge for Unlocked */}
              {achievement.unlocked && (
                <div className="absolute top-4 right-6">
                  <Badge className="bg-primary text-primary-foreground font-black uppercase tracking-tighter px-3 py-1 shadow-xl">
                    Unlocked
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <achievement.icon className={cn("size-4", achievement.unlocked ? "text-primary" : "text-zinc-500")} />
                <h3 className="font-bold text-lg">{achievement.name}</h3>
              </div>
              <p className="text-sm text-zinc-400 mb-4 leading-relaxed">
                {achievement.description}
              </p>
              
              <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5">
                <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Requirement</div>
                <div className="text-xs text-zinc-300 leading-snug">
                  {achievement.requirement}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
