import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Flame, Wand2, Image, Anvil, Sparkles, ArrowRight, Star, Users, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/Layout";
import { ForgeCard } from "@/components/shared/ForgeCard";
import { EmberParticles } from "@/components/shared/EmberParticles";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import heroImage from "@/assets/hero-forge.jpg";

export default function Index() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Wand2,
      title: t("home.features.nameGenerator.title"),
      description: t("home.features.nameGenerator.description"),
      link: "/name-generator",
      cta: t("common.generate"),
    },
    {
      icon: Image,
      title: t("home.features.avatarMaker.title"),
      description: t("home.features.avatarMaker.description"),
      link: "/avatar-maker",
      cta: t("common.create"),
    },
    {
      icon: Anvil,
      title: t("home.features.workbench.title"),
      description: t("home.features.workbench.description"),
      link: "/workbench",
      cta: t("home.startForging"),
    },
  ];

  const stats = [
    { icon: Users, value: "10K+", label: t("home.stats.charactersCreated") },
    { icon: Zap, value: "50K+", label: t("home.stats.namesGenerated") },
    { icon: Star, value: "4.9", label: t("home.stats.userRating") },
  ];

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
        <EmberParticles count={30} intensity="high" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border mb-8 backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">
                {t("common.poweredByAI")}
              </span>
            </motion.div>
            
            {/* Main Title */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            >
              <span className="text-foreground">{t("home.heroTitle")}</span>
              <br />
              <span className="text-gradient-ember">{t("home.heroTitleHighlight")}</span>
            </motion.h1>
            
            {/* Subtitle */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              {t("home.heroSubtitle")}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/workbench">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="hero" size="xl" className="group">
                    <Flame className="h-5 w-5 group-hover:animate-pulse" />
                    {t("home.startForging")}
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/name-generator">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" size="lg" className="backdrop-blur-sm">
                    {t("home.tryFreeTools")}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
          </motion.div>
        </motion.div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>
      
      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient-ember mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              {t("home.features.subtitle")}
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedSection key={feature.title} delay={index * 0.15}>
                  <ForgeCard 
                    className="group h-full"
                    glow={index === 2}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        <motion.div 
                          whileHover={{ rotate: 5, scale: 1.1 }}
                          className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300"
                        >
                          <Icon className="h-7 w-7 text-primary" />
                        </motion.div>
                      </div>
                      
                      <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 flex-grow text-sm lg:text-base">
                        {feature.description}
                      </p>
                      
                      <Link to={feature.link}>
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button variant="forge" className="w-full group/btn">
                            {feature.cta}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </motion.div>
                      </Link>
                    </div>
                  </ForgeCard>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 lg:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <AnimatedSection key={stat.label} delay={index * 0.1}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient-ember">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <EmberParticles count={15} intensity="low" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("home.cta.title")}
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto mb-10">
              {t("home.cta.subtitle")}
            </p>
            <Link to="/name-generator">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
                <Button variant="ember" size="xl">
                  <Wand2 className="h-5 w-5" />
                  {t("home.cta.button")}
                </Button>
              </motion.div>
            </Link>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-primary" />
              <span className="font-display text-lg font-bold text-gradient-ember">{t("common.appName")}</span>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              {t("home.footer.copyright")}
            </p>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
