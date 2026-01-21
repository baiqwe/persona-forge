import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wand2, Copy, Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ForgeCard } from "@/components/shared/ForgeCard";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock name generation - in production this would call an AI API
const generateNames = (race: string, style: string): string[] => {
  const nameParts: Record<string, string[]> = {
    human: ["Ald", "Bran", "Cor", "Dav", "Eth", "Gar", "Hal", "Ivan", "Jak", "Kor"],
    elf: ["Ael", "Lar", "Syl", "Ith", "Ean", "Vor", "Thal", "Nym", "Cel", "Rin"],
    dwarf: ["Thur", "Brum", "Gar", "Dor", "Bol", "Grim", "Thor", "Bron", "Dur", "Gor"],
    orc: ["Grok", "Thrak", "Morg", "Krag", "Druk", "Brak", "Garn", "Thog", "Ruk", "Zog"],
    tiefling: ["Mal", "Zar", "Vor", "Nix", "Kor", "Xel", "Bal", "Mor", "Drak", "Ash"],
    dragonborn: ["Vyx", "Zyr", "Kael", "Drac", "Sorn", "Ryx", "Nax", "Vorn", "Tyrn", "Xar"],
  };

  const suffixes: Record<string, string[]> = {
    fantasy: ["iel", "wen", "dor", "mir", "thas", "orn", "ael", "ith", "ion", "ara"],
    medieval: ["worth", "helm", "guard", "shield", "blade", "stone", "wood", "field", "brook", "ford"],
    modern: ["son", "ton", "er", "es", "ley", "man", "berg", "stein", "ski", "ov"],
    scifi: ["ex", "on", "ax", "ix", "or", "an", "is", "os", "us", "ar"],
    japanese: ["ko", "mi", "ki", "ra", "ta", "na", "shi", "ka", "ri", "no"],
    nordic: ["sson", "dottir", "heim", "gard", "vik", "berg", "fjord", "mund", "rid", "ulf"],
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
  const { t } = useTranslation();
  const [race, setRace] = useState("elf");
  const [style, setStyle] = useState("fantasy");
  const [names, setNames] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const races = [
    { value: "human", label: t("nameGenerator.races.human") },
    { value: "elf", label: t("nameGenerator.races.elf") },
    { value: "dwarf", label: t("nameGenerator.races.dwarf") },
    { value: "orc", label: t("nameGenerator.races.orc") },
    { value: "tiefling", label: t("nameGenerator.races.tiefling") },
    { value: "dragonborn", label: t("nameGenerator.races.dragonborn") },
  ];

  const styles = [
    { value: "fantasy", label: t("nameGenerator.styles.fantasy") },
    { value: "medieval", label: t("nameGenerator.styles.medieval") },
    { value: "modern", label: t("nameGenerator.styles.modern") },
    { value: "scifi", label: t("nameGenerator.styles.scifi") },
    { value: "japanese", label: t("nameGenerator.styles.japanese") },
    { value: "nordic", label: t("nameGenerator.styles.nordic") },
  ];

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
      <div className="min-h-screen py-20 sm:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedSection>
            <SectionHeader
              title={t("nameGenerator.title")}
              subtitle={t("nameGenerator.subtitle")}
            />
          </AnimatedSection>

          {/* Controls */}
          <AnimatedSection delay={0.1}>
            <ForgeCard className="mb-8">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t("nameGenerator.raceLabel")}
                  </label>
                  <Select value={race} onValueChange={setRace}>
                    <SelectTrigger className="bg-secondary border-border h-12">
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
                    {t("nameGenerator.styleLabel")}
                  </label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger className="bg-secondary border-border h-12">
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
                      {t("common.generating")}
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5" />
                      {t("nameGenerator.generateNames")}
                    </>
                  )}
                </Button>
              </motion.div>
            </ForgeCard>
          </AnimatedSection>

          {/* Results */}
          <AnimatePresence mode="wait">
            {names.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h3 className="font-display text-xl font-bold text-foreground">
                  {t("nameGenerator.generatedNames")}
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {names.map((name, index) => (
                    <motion.div
                      key={`${name}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-all"
                    >
                      <span className="font-display text-base sm:text-lg text-foreground">
                        {name}
                      </span>
                      <div className="flex items-center gap-2">
                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopy(name, index)}
                            className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                          >
                            {copiedIndex === index ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </motion.div>
                        <Link to={`/workbench?name=${encodeURIComponent(name)}`}>
                          <Button variant="forge" size="sm" className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-xs sm:text-sm">
                            <span className="hidden sm:inline">{t("nameGenerator.createCharacter")}</span>
                            <span className="sm:hidden">{t("common.create")}</span>
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Layout>
  );
}
