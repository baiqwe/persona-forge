import { motion } from "framer-motion";
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
    <motion.div
      whileHover={hover ? { y: -6, scale: 1.01 } : undefined}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className={cn(
        "relative rounded-xl border border-border bg-gradient-card p-6 shadow-card",
        glow && "border-ember shadow-ember",
        className
      )}
    >
      {/* Subtle corner accents with animation */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/20 rounded-tl-xl transition-all duration-300 group-hover:border-primary/40" />
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/20 rounded-tr-xl transition-all duration-300 group-hover:border-primary/40" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/20 rounded-bl-xl transition-all duration-300 group-hover:border-primary/40" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/20 rounded-br-xl transition-all duration-300 group-hover:border-primary/40" />
      
      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
