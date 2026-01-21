import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Anvil, User, Palette, MessageCircle, Download, RefreshCw, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ForgeCard } from "@/components/shared/ForgeCard";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CharacterData {
  name: string;
  keywords: string[];
  persona: string;
  avatar: string | null;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const keywordSuggestions = [
  "Tsundere", "Kuudere", "Yandere", "Cheerful", "Mysterious",
  "Warrior", "Mage", "Thief", "Noble", "Outcast",
  "Vampire", "Werewolf", "Dragon", "Angel", "Demon",
  "Princess", "Knight", "Assassin", "Scholar", "Merchant",
];

// Mock persona expansion
const expandPersona = (keywords: string[]): string => {
  if (keywords.length === 0) return "";
  
  const intros = [
    `This character embodies the essence of ${keywords.join(", ")}. `,
    `A complex individual defined by their ${keywords.join(" and ")} nature. `,
    `Known throughout the realm for being ${keywords.join(", ")}, this character `,
  ];
  
  const bodies = [
    "They carry themselves with an air of confidence, yet harbor deep secrets from their past. ",
    "Their journey has shaped them into who they are today, though the scars remain. ",
    "Behind their outward demeanor lies a complicated history that few truly understand. ",
  ];
  
  const endings = [
    "Those who earn their trust find a loyal companion; those who betray them discover the depths of their resolve.",
    "They seek adventure not for glory, but to find meaning in a world that has often been cruel.",
    "Their story is far from over, and the next chapter promises to be their greatest yet.",
  ];
  
  return (
    intros[Math.floor(Math.random() * intros.length)] +
    bodies[Math.floor(Math.random() * bodies.length)] +
    endings[Math.floor(Math.random() * endings.length)]
  );
};

// Mock chat response
const generateResponse = (character: CharacterData, userMessage: string): string => {
  const responses = [
    `*${character.name} looks at you thoughtfully* "An interesting question indeed..."`,
    `"Hmm," *${character.name} considers your words* "I suppose you have a point there."`,
    `*A slight smile crosses ${character.name}'s face* "You remind me of someone I once knew."`,
    `"That's quite bold of you to say," *${character.name} replies with a hint of amusement*`,
    `*${character.name} pauses, choosing their words carefully* "Let me tell you a story..."`,
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export default function Workbench() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("create");
  const [character, setCharacter] = useState<CharacterData>({
    name: searchParams.get("name") || "",
    keywords: [],
    persona: "",
    avatar: searchParams.get("avatar") || null,
  });
  const [isGeneratingPersona, setIsGeneratingPersona] = useState(false);
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Generate random name
  const generateRandomName = () => {
    const prefixes = ["Aer", "Val", "Kyr", "Nyx", "Sol", "Lun", "Vor", "Zeph"];
    const suffixes = ["iel", "wyn", "dor", "ara", "ith", "eon", "ris", "vex"];
    const name = prefixes[Math.floor(Math.random() * prefixes.length)] + 
                 suffixes[Math.floor(Math.random() * suffixes.length)];
    setCharacter((prev) => ({ ...prev, name }));
  };

  // Toggle keyword selection
  const toggleKeyword = (keyword: string) => {
    setCharacter((prev) => ({
      ...prev,
      keywords: prev.keywords.includes(keyword)
        ? prev.keywords.filter((k) => k !== keyword)
        : prev.keywords.length < 3
        ? [...prev.keywords, keyword]
        : prev.keywords,
    }));
  };

  // Generate persona from keywords
  const handleGeneratePersona = () => {
    if (character.keywords.length === 0) return;
    setIsGeneratingPersona(true);
    setTimeout(() => {
      const persona = expandPersona(character.keywords);
      setCharacter((prev) => ({ ...prev, persona }));
      setIsGeneratingPersona(false);
    }, 1000);
  };

  // Generate avatar
  const handleGenerateAvatar = () => {
    setIsGeneratingAvatar(true);
    setTimeout(() => {
      const seed = Date.now();
      setCharacter((prev) => ({
        ...prev,
        avatar: `https://picsum.photos/seed/${seed}/400/400`,
      }));
      setIsGeneratingAvatar(false);
    }, 1500);
  };

  // Send chat message
  const handleSendMessage = () => {
    if (!chatInput.trim() || isSending) return;
    
    const userMessage: ChatMessage = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput("");
    setIsSending(true);

    setTimeout(() => {
      const response = generateResponse(character, chatInput);
      setChatMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setIsSending(false);
    }, 1000);
  };

  // Download character card (mock)
  const handleDownload = () => {
    const cardData = JSON.stringify(character, null, 2);
    const blob = new Blob([cardData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${character.name || "character"}_card.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Layout>
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient-ember flex items-center gap-3">
                <Anvil className="h-8 w-8" />
                Character Workbench
              </h1>
              <p className="text-muted-foreground mt-2">
                Create, customize, and chat with your original characters
              </p>
            </div>
            {character.name && (
              <Button variant="ember" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Export Card
              </Button>
            )}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="create" className="gap-2">
                <User className="h-4 w-4" />
                Identity
              </TabsTrigger>
              <TabsTrigger value="visual" className="gap-2">
                <Palette className="h-4 w-4" />
                Visual
              </TabsTrigger>
              <TabsTrigger 
                value="chat" 
                className="gap-2"
                disabled={!character.name || !character.persona}
              >
                <MessageCircle className="h-4 w-4" />
                Chat
              </TabsTrigger>
            </TabsList>

            {/* Identity Tab */}
            <TabsContent value="create">
              <div className="grid lg:grid-cols-2 gap-8">
                <ForgeCard>
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Character Identity
                  </h3>

                  {/* Name */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter character name..."
                        value={character.name}
                        onChange={(e) =>
                          setCharacter((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="bg-secondary border-border"
                      />
                      <Button variant="outline" onClick={generateRandomName}>
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Core Traits (Select up to 3)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {keywordSuggestions.map((keyword) => (
                        <Badge
                          key={keyword}
                          variant={character.keywords.includes(keyword) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/20 transition-colors"
                          onClick={() => toggleKeyword(keyword)}
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Selected: {character.keywords.join(", ") || "None"}
                    </p>
                  </div>

                  {/* Generate Persona */}
                  <Button
                    variant="ember"
                    className="w-full"
                    onClick={handleGeneratePersona}
                    disabled={character.keywords.length === 0 || isGeneratingPersona}
                  >
                    {isGeneratingPersona ? (
                      <>
                        <Sparkles className="h-4 w-4 animate-spin" />
                        Generating Persona...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Generate Persona from Traits
                      </>
                    )}
                  </Button>
                </ForgeCard>

                {/* Persona Preview */}
                <ForgeCard glow={!!character.persona}>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Character Persona
                  </h3>
                  {character.persona ? (
                    <>
                      <div className="p-4 rounded-lg bg-secondary/50 border border-border mb-4">
                        <p className="text-foreground leading-relaxed">{character.persona}</p>
                      </div>
                      <Textarea
                        placeholder="Edit persona..."
                        value={character.persona}
                        onChange={(e) =>
                          setCharacter((prev) => ({ ...prev, persona: e.target.value }))
                        }
                        className="min-h-[150px] bg-secondary border-border"
                      />
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-64 border-2 border-dashed border-border rounded-lg">
                      <p className="text-muted-foreground text-center">
                        Select traits and generate a persona
                        <br />
                        <span className="text-sm">Your character's story will appear here</span>
                      </p>
                    </div>
                  )}
                </ForgeCard>
              </div>
            </TabsContent>

            {/* Visual Tab */}
            <TabsContent value="visual">
              <div className="grid lg:grid-cols-2 gap-8">
                <ForgeCard>
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Generate Avatar
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Create a visual representation of your character based on their identity.
                  </p>
                  <Button
                    variant="ember"
                    size="lg"
                    className="w-full"
                    onClick={handleGenerateAvatar}
                    disabled={isGeneratingAvatar}
                  >
                    {isGeneratingAvatar ? (
                      <>
                        <Sparkles className="h-5 w-5 animate-spin" />
                        Generating Avatar...
                      </>
                    ) : (
                      <>
                        <Palette className="h-5 w-5" />
                        Generate Character Portrait
                      </>
                    )}
                  </Button>
                </ForgeCard>

                <ForgeCard glow={!!character.avatar}>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Character Portrait
                  </h3>
                  {character.avatar ? (
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary/30">
                      <img
                        src={character.avatar}
                        alt={character.name || "Character"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-square flex items-center justify-center border-2 border-dashed border-border rounded-lg">
                      <div className="text-center text-muted-foreground">
                        <Palette className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Your character portrait will appear here</p>
                      </div>
                    </div>
                  )}
                </ForgeCard>
              </div>
            </TabsContent>

            {/* Chat Tab */}
            <TabsContent value="chat">
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Character Card */}
                <ForgeCard className="lg:col-span-1">
                  <div className="text-center">
                    {character.avatar && (
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary/30">
                        <img
                          src={character.avatar}
                          alt={character.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-display text-2xl font-bold text-gradient-ember mb-2">
                      {character.name}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-1 mb-4">
                      {character.keywords.map((keyword) => (
                        <Badge key={keyword} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-4">
                      {character.persona}
                    </p>
                  </div>
                </ForgeCard>

                {/* Chat Area */}
                <ForgeCard className="lg:col-span-2 flex flex-col" glow>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    Chat with {character.name}
                  </h3>
                  
                  <ScrollArea className="flex-1 h-[400px] pr-4 mb-4">
                    {chatMessages.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                        <div>
                          <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p>Start a conversation with {character.name}</p>
                          <p className="text-sm">Say hello to begin!</p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {chatMessages.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                msg.role === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-secondary text-secondary-foreground"
                              }`}
                            >
                              {msg.content}
                            </div>
                          </div>
                        ))}
                        {isSending && (
                          <div className="flex justify-start">
                            <div className="bg-secondary text-secondary-foreground p-3 rounded-lg">
                              <Sparkles className="h-4 w-4 animate-spin" />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input
                      placeholder={`Message ${character.name}...`}
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                      className="bg-secondary border-border"
                    />
                    <Button
                      variant="ember"
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim() || isSending}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </ForgeCard>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
