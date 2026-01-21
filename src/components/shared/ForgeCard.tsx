import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ForgeCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function ForgeCard({ children, className, hover = true, glow = false }: ForgeCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-gradient-card p-6 shadow-card transition-all duration-300",
        hover && "hover:border-primary/30 hover:shadow-elevated hover:-translate-y-1",
        glow && "border-ember shadow-ember",
        className
      )}
    >
      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-xl" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-xl" />
      
      {children}
    </div>
  );
}
