import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Wand2, Image, Trash2, MessageCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ForgeCard } from "@/components/shared/ForgeCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedStagger, StaggerItem } from "@/components/shared/AnimatedStagger";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Character {
  id: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  keywords: string[];
  created_at: string;
}

export default function Dashboard() {
  const { t } = useTranslation();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  // Fetch characters
  useEffect(() => {
    if (user) {
      fetchCharacters();
    }
  }, [user]);

  const fetchCharacters = async () => {
    try {
      const { data, error } = await supabase
        .from("characters")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCharacters(data || []);
    } catch (error) {
      toast({
        title: t("auth.authError"),
        description: "Failed to load characters",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from("characters")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setCharacters((prev) => prev.filter((c) => c.id !== id));
      toast({
        title: t("dashboard.deleteSuccess"),
        description: t("dashboard.deleteSuccessDesc", { name }),
      });
    } catch (error) {
      toast({
        title: t("auth.authError"),
        description: "Failed to delete character",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <SectionHeader
              title={t("dashboard.title")}
              subtitle={t("dashboard.subtitle")}
            />
            <Link to="/workbench">
              <Button variant="ember" size="lg">
                <Plus className="h-5 w-5" />
                {t("dashboard.newCharacter")}
              </Button>
            </Link>
          </div>

          {/* Characters Grid */}
          {characters.length > 0 ? (
            <AnimatedStagger className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {characters.map((character) => (
                  <StaggerItem key={character.id}>
                    <motion.div
                      layout
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ForgeCard className="group relative h-full">
                        {/* Delete Button */}
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <button
                              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-destructive/10 text-destructive opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20"
                              disabled={deletingId === character.id}
                            >
                              {deletingId === character.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 className="h-4 w-4" />
                              )}
                            </button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-card border-border">
                            <AlertDialogHeader>
                              <AlertDialogTitle>{t("dashboard.deleteConfirmTitle")}</AlertDialogTitle>
                              <AlertDialogDescription>
                                {t("dashboard.deleteConfirmDesc", { name: character.name })}
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(character.id, character.name)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {t("common.delete")}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* Card Content */}
                        <Link to={`/workbench?id=${character.id}`} className="block">
                          {/* Avatar */}
                          <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-secondary">
                            {character.avatar_url ? (
                              <img
                                src={character.avatar_url}
                                alt={character.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="font-display text-4xl text-muted-foreground">
                                  {character.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <h3 className="font-display text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {character.name}
                          </h3>

                          {/* Keywords */}
                          {character.keywords && character.keywords.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {character.keywords.slice(0, 3).map((keyword) => (
                                <Badge key={keyword} variant="secondary" className="text-xs">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Bio */}
                          {character.bio && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {character.bio}
                            </p>
                          )}
                        </Link>

                        {/* Chat Button */}
                        <Link
                          to={`/workbench?id=${character.id}&tab=chat`}
                          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Button variant="ember" size="sm">
                            <MessageCircle className="h-4 w-4" />
                            {t("workbench.tabs.chat")}
                          </Button>
                        </Link>
                      </ForgeCard>
                    </motion.div>
                  </StaggerItem>
                ))}
              </AnimatePresence>
            </AnimatedStagger>
          ) : (
            /* Empty State */
            <ForgeCard className="text-center py-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                  <Plus className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  {t("dashboard.noCharacters")}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {t("dashboard.noCharactersDesc")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/name-generator">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      <Wand2 className="h-5 w-5" />
                      {t("nav.nameGenerator")}
                    </Button>
                  </Link>
                  <Link to="/avatar-maker">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      <Image className="h-5 w-5" />
                      {t("nav.avatarMaker")}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </ForgeCard>
          )}
        </div>
      </div>
    </Layout>
  );
}
