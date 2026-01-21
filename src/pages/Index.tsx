import { Link } from "react-router-dom";
import { Flame, Wand2, Image, Anvil, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ForgeCard } from "@/components/shared/ForgeCard";
import { EmberParticles } from "@/components/shared/EmberParticles";
import heroImage from "@/assets/hero-forge.jpg";

const features = [
  {
    icon: Wand2,
    title: "AI Name Generator",
    description: "Generate unique fantasy names for any race or style. Perfect for characters, places, and more.",
    link: "/name-generator",
    cta: "Generate Names",
  },
  {
    icon: Image,
    title: "Visual Avatar Maker",
    description: "Create stunning character portraits with AI. Describe your vision and watch it come to life.",
    link: "/avatar-maker",
    cta: "Create Avatar",
  },
  {
    icon: Anvil,
    title: "Character Workbench",
    description: "Build complete character cards with personality, backstory, and visuals. Chat with your creations.",
    link: "/workbench",
    cta: "Start Forging",
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        {/* Ember Particles */}
        <EmberParticles />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border mb-8">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Powered by AI Magic
              </span>
            </div>
            
            {/* Main Title */}
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-foreground">Breathe Life Into</span>
              <br />
              <span className="text-gradient-ember">Your Imagination</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Create unique characters, generate fantasy names, and bring your original creations to life with AI-powered tools.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/workbench">
                <Button variant="hero" size="xl" className="group">
                  <Flame className="h-5 w-5 group-hover:animate-pulse" />
                  Start Forging
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/name-generator">
                <Button variant="outline" size="lg">
                  Try Free Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gradient-ember mb-4">
              Your Creative Arsenal
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI tools designed for storytellers, artists, and dreamers.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ForgeCard 
                  key={feature.title} 
                  className="group"
                  glow={index === 2}
                >
                  <div className="flex flex-col h-full">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    
                    <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-6 flex-grow">
                      {feature.description}
                    </p>
                    
                    <Link to={feature.link}>
                      <Button variant="forge" className="w-full group/btn">
                        {feature.cta}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </ForgeCard>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <EmberParticles />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Ready to Create Your First
            <span className="text-gradient-ember"> Character?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-10">
            No sign-up required for our free tools. Start generating names and avatars instantly.
          </p>
          <Link to="/name-generator">
            <Button variant="ember" size="xl">
              <Wand2 className="h-5 w-5" />
              Try Name Generator Free
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold text-gradient-ember">OC Forge</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 OC Forge. Breathe life into your imagination.
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
