import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ title, subtitle, className, align = "center" }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8", align === "center" && "text-center", className)}>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-ember mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
