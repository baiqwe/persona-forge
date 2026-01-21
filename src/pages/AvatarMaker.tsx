import { useState } from "react";
import { Image, Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ForgeCard } from "@/components/shared/ForgeCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
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
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4 max-w-5xl">
          <SectionHeader
            title="Visual Avatar Maker"
            subtitle="Create stunning character portraits with AI. Describe your vision or use tags to customize."
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Controls */}
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
                    className="min-h-[120px] bg-secondary border-border resize-none"
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
                          <Badge
                            key={color}
                            variant={selectedTags.hair === color ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/20 transition-colors"
                            onClick={() => toggleTag("hair", color)}
                          >
                            {color}
                          </Badge>
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
                          <Badge
                            key={color}
                            variant={selectedTags.eyes === color ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/20 transition-colors"
                            onClick={() => toggleTag("eyes", color)}
                          >
                            {color}
                          </Badge>
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
                          <Badge
                            key={outfit}
                            variant={selectedTags.outfit === outfit ? "default" : "outline"}
                            className="cursor-pointer hover:bg-primary/20 transition-colors"
                            onClick={() => toggleTag("outfit", outfit)}
                          >
                            {outfit}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ember"
                  size="lg"
                  className="w-full"
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
              </div>
            </ForgeCard>

            {/* Preview Area */}
            <ForgeCard>
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display text-xl font-bold text-foreground">
                    Preview
                  </h3>
                  {avatars.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={handleGenerate}>
                      <RefreshCw className="h-4 w-4" />
                      Regenerate
                    </Button>
                  )}
                </div>

                {avatars.length === 0 ? (
                  <div className="flex-1 flex items-center justify-center border-2 border-dashed border-border rounded-lg min-h-[300px]">
                    <div className="text-center text-muted-foreground">
                      <Image className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>Your generated avatars will appear here</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {avatars.map((avatar, index) => (
                        <button
                          key={index}
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
                            <div className="absolute inset-0 bg-primary/10" />
                          )}
                        </button>
                      ))}
                    </div>

                    {selectedAvatar !== null && (
                      <Link to={`/workbench?avatar=${encodeURIComponent(avatars[selectedAvatar])}`}>
                        <Button variant="forge" className="w-full">
                          Chat with this Character
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </ForgeCard>
          </div>
        </div>
      </div>
    </Layout>
  );
}
