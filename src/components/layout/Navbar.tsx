import { Link, useLocation } from "react-router-dom";
import { Flame, Wand2, Image, Anvil, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/name-generator", label: "Name Generator", icon: Wand2 },
  { path: "/avatar-maker", label: "Avatar Maker", icon: Image },
  { path: "/workbench", label: "Workbench", icon: Anvil },
];

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Flame className="h-8 w-8 text-primary glow-ember transition-all duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="font-display text-xl font-bold text-gradient-ember">
            OC Forge
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "gap-2 font-body",
                    isActive && "bg-secondary text-primary"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link to="/workbench">
            <Button variant="ember" className="hidden sm:flex">
              <Anvil className="h-4 w-4" />
              Start Creating
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
