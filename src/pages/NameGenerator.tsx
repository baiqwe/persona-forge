import { useState } from "react";
import { Wand2, Copy, Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ForgeCard } from "@/components/shared/ForgeCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const races = [
  { value: "elf", label: "Elf" },
  { value: "orc", label: "Orc" },
  { value: "human", label: "Human" },
  { value: "demon", label: "Demon" },
  { value: "dwarf", label: "Dwarf" },
  { value: "dragon", label: "Dragon" },
];

const styles = [
  { value: "fantasy", label: "Fantasy" },
  { value: "scifi", label: "Sci-Fi" },
  { value: "cute", label: "Cute" },
  { value: "dark", label: "Dark" },
  { value: "noble", label: "Noble" },
  { value: "warrior", label: "Warrior" },
];

// Mock name generation - in production this would call an AI API
const generateNames = (race: string, style: string): string[] => {
  const nameParts: Record<string, string[]> = {
    elf: ["Ael", "Lar", "Syl", "Ith", "Ean", "Vor", "Thal", "Nym", "Cel", "Rin"],
    orc: ["Grok", "Thrak", "Morg", "Krag", "Druk", "Brak", "Garn", "Thog", "Ruk", "Zog"],
    human: ["Ald", "Bran", "Cor", "Dav", "Eth", "Gar", "Hal", "Ivan", "Jak", "Kor"],
    demon: ["Mal", "Zar", "Vor", "Nix", "Kor", "Xel", "Bal", "Mor", "Drak", "Ash"],
    dwarf: ["Thur", "Brum", "Gar", "Dor", "Bol", "Grim", "Thor", "Bron", "Dur", "Gor"],
    dragon: ["Vyx", "Zyr", "Kael", "Drac", "Sorn", "Ryx", "Nax", "Vorn", "Tyrn", "Xar"],
  };

  const suffixes: Record<string, string[]> = {
    fantasy: ["iel", "wen", "dor", "mir", "thas", "orn", "ael", "ith", "ion", "ara"],
    scifi: ["ex", "on", "ax", "ix", "or", "an", "is", "os", "us", "ar"],
    cute: ["i", "y", "ie", "ling", "kin", "belle", "star", "bloom", "heart", "puff"],
    dark: ["bane", "doom", "shade", "void", "dread", "mort", "night", "shadow", "grim", "fell"],
    noble: ["worth", "crest", "helm", "crown", "shield", "guard", "reign", "throne", "lord", "grace"],
    warrior: ["blade", "fang", "storm", "iron", "steel", "rage", "fury", "blood", "war", "strike"],
  };

  const prefixes = nameParts[race] || nameParts.human;
  const ends = suffixes[style] || suffixes.fantasy;

  const names: string[] = [];
  for (let i = 0; i < 10; i++) {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = ends[Math.floor(Math.random() * ends.length)];
    names.push(prefix + suffix);
  }
  return names;
};

export default function NameGenerator() {
  const [race, setRace] = useState("elf");
  const [style, setStyle] = useState("fantasy");
  const [names, setNames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API delay
    setTimeout(() => {
      setNames(generateNames(race, style));
      setIsGenerating(false);
    }, 500);
  };

  const handleCopy = (name: string, index: number) => {
    navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionHeader
            title="AI Name Generator"
            subtitle="Generate unique fantasy names for your characters. Choose a race and style to get started."
          />

          {/* Controls */}
          <ForgeCard className="mb-8">
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Race
                </label>
                <Select value={race} onValueChange={setRace}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {races.map((r) => (
                      <SelectItem key={r.value} value={r.value}>
                        {r.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Style
                </label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="h-5 w-5" />
                  Generate 10 Names
                </>
              )}
            </Button>
          </ForgeCard>

          {/* Results */}
          {names.length > 0 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="font-display text-xl font-bold text-foreground">
                Generated Names
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {names.map((name, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-all"
                  >
                    <span className="font-display text-lg text-foreground">
                      {name}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCopy(name, index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {copiedIndex === index ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Link to={`/workbench?name=${encodeURIComponent(name)}`}>
                        <Button variant="forge" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          Create Character
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
