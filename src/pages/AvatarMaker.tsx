import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ForgeCard } from "@/components/shared/ForgeCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const hairColors = ["Black", "Brown", "Blonde", "Red", "White", "Blue", "Purple", "Green"];
const eyeColors = ["Brown", "Blue", "Green", "Amber", "Purple", "Red", "Gold", "Silver"];
const outfits = ["Armor", "Robe", "Casual", "Royal", "Ninja", "Cyberpunk", "Victorian", "Tribal"];

// Mock avatar generation - returns placeholder images
const generateAvatars = (): string[] => {
  const seed = Date.now();
  return [
    `https://picsum.photos/seed/${seed}1/400/400`,
    `https://picsum.photos/seed/${seed}2/400/400`,
    `https://picsum.photos/seed/${seed}3/400/400`,
    `https://picsum.photos/seed/${seed}4/400/400`,
  ];
};

export default function AvatarMaker() {
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<{
    hair: string | null;
    eyes: string | null;
    outfit: string | null;
  }>({ hair: null, eyes: null, outfit: null });
  const [avatars, setAvatars] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleTag = (category: "hair" | "eyes" | "outfit", value: string) => {
    setSelectedTags((prev) => ({
      ...prev,
      [category]: prev[category] === value ? null : value,
    }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setSelectedAvatar(null);
    // Simulate API delay
    setTimeout(() => {
      setAvatars(generateAvatars());
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="min-h-screen py-20 sm:py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedSection>
            <SectionHeader
              title="Visual Avatar Maker"
              subtitle="Create stunning character portraits with AI. Describe your vision or use tags to customize."
            />
          </AnimatedSection>

          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Controls */}
            <AnimatedSection delay={0.1}>
              <ForgeCard>
                <div className="space-y-6">
                  {/* Description Input */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Describe Your Character
                    </label>
                    <Textarea
                      placeholder="A mysterious elven archer with a scar across their left eye, standing in moonlight..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[100px] sm:min-h-[120px] bg-secondary border-border resize-none text-sm sm:text-base"
                    />
                  </div>

                  {/* Tag Selections */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Or Use Quick Tags
                    </label>

                    <div className="space-y-4">
                      {/* Hair Color */}
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          Hair Color
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {hairColors.map((color) => (
                            <motion.div key={color} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Badge
                                variant={selectedTags.hair === color ? "default" : "outline"}
                                className="cursor-pointer hover:bg-primary/20 transition-colors text-xs sm:text-sm"
                                onClick={() => toggleTag("hair", color)}
                              >
                                {color}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Eye Color */}
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          Eye Color
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {eyeColors.map((color) => (
                            <motion.div key={color} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Badge
                                variant={selectedTags.eyes === color ? "default" : "outline"}
                                className="cursor-pointer hover:bg-primary/20 transition-colors text-xs sm:text-sm"
                                onClick={() => toggleTag("eyes", color)}
                              >
                                {color}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Outfit */}
                      <div>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          Outfit Style
                        </span>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {outfits.map((outfit) => (
                            <motion.div key={outfit} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Badge
                                variant={selectedTags.outfit === outfit ? "default" : "outline"}
                                className="cursor-pointer hover:bg-primary/20 transition-colors text-xs sm:text-sm"
                                onClick={() => toggleTag("outfit", outfit)}
                              >
                                {outfit}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      variant="ember"
                      size="lg"
                      className="w-full h-12 sm:h-14"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Sparkles className="h-5 w-5 animate-spin" />
                          Generating Avatars...
                        </>
                      ) : (
                        <>
                          <Image className="h-5 w-5" />
                          Generate 4 Avatars
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </ForgeCard>
            </AnimatedSection>

            {/* Preview Area */}
            <AnimatedSection delay={0.2} direction="right">
              <ForgeCard>
                <div className="h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                      Preview
                    </h3>
                    {avatars.length > 0 && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button variant="ghost" size="sm" onClick={handleGenerate}>
                          <RefreshCw className="h-4 w-4" />
                          <span className="hidden sm:inline ml-1">Regenerate</span>
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  <AnimatePresence mode="wait">
                    {avatars.length === 0 ? (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg min-h-[250px] sm:min-h-[300px]"
                      >
                        <div className="text-center text-muted-foreground p-4">
                          <Image className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 opacity-50" />
                          <p className="text-sm sm:text-base">Your generated avatars will appear here</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          {avatars.map((avatar, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setSelectedAvatar(index)}
                              className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                selectedAvatar === index
                                  ? "border-primary shadow-ember scale-[1.02]"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <img
                                src={avatar}
                                alt={`Generated avatar ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {selectedAvatar === index && (
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="absolute inset-0 bg-primary/10" 
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>

                        <AnimatePresence>
                          {selectedAvatar !== null && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                            >
                              <Link to={`/workbench?avatar=${encodeURIComponent(avatars[selectedAvatar])}`}>
                                <Button variant="forge" className="w-full h-12">
                                  Chat with this Character
                                  <ArrowRight className="h-4 w-4" />
                                </Button>
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ForgeCard>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </Layout>
  );
}
