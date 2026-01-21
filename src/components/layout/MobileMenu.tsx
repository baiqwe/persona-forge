import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { X, Wand2, Image, Anvil, Flame, Home, LayoutDashboard, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/name-generator", label: "Name Generator", icon: Wand2 },
  { path: "/avatar-maker", label: "Avatar Maker", icon: Image },
  { path: "/workbench", label: "Workbench", icon: Anvil },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed Out",
      description: "You have been signed out successfully.",
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-[280px] bg-card border-l border-border shadow-elevated"
          >
            <div className="flex flex-col h-full p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Flame className="h-6 w-6 text-primary glow-ember" />
                  <span className="font-display text-lg font-bold text-gradient-ember">
                    OC Forge
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* User Section */}
              {user && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 rounded-lg bg-secondary"
                >
                  <p className="text-sm text-muted-foreground">Signed in as</p>
                  <p className="text-sm font-medium text-foreground truncate">
                    {user.email}
                  </p>
                </motion.div>
              )}

              {/* Nav Items */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {user && (
                    <motion.li
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 }}
                    >
                      <Link to="/dashboard" onClick={onClose}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start gap-3 h-12 text-base",
                            location.pathname === "/dashboard" && "bg-secondary text-primary"
                          )}
                        >
                          <LayoutDashboard className="h-5 w-5" />
                          My Characters
                        </Button>
                      </Link>
                    </motion.li>
                  )}
                  {navItems.map((item, index) => {
                    const isActive = location.pathname === item.path;
                    const Icon = item.icon;
                    return (
                      <motion.li
                        key={item.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (user ? index + 1 : index) * 0.05 + 0.1 }}
                      >
                        <Link to={item.path} onClick={onClose}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start gap-3 h-12 text-base",
                              isActive && "bg-secondary text-primary"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                            {item.label}
                          </Button>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              {/* Bottom Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full h-12 text-destructive hover:text-destructive"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-5 w-5" />
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth" onClick={onClose}>
                    <Button variant="outline" className="w-full h-12">
                      <User className="h-5 w-5" />
                      Sign In
                    </Button>
                  </Link>
                )}
                <Link to="/workbench" onClick={onClose}>
                  <Button variant="ember" className="w-full h-12">
                    <Anvil className="h-5 w-5" />
                    Start Creating
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
