import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
}

interface EmberParticlesProps {
  count?: number;
  intensity?: "low" | "medium" | "high";
}

export function EmberParticles({ count = 25, intensity = "medium" }: EmberParticlesProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particles = useMemo(() => {
    const baseOpacity = intensity === "low" ? 0.3 : intensity === "high" ? 0.8 : 0.5;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      size: 2 + Math.random() * 5,
      drift: (Math.random() - 0.5) * 40,
      opacity: baseOpacity + Math.random() * 0.3,
    }));
  }, [count, intensity]);

  if (!isClient) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          initial={{
            bottom: -10,
            left: `${particle.x}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            bottom: ["0%", "100%"],
            left: [`${particle.x}%`, `${particle.x + particle.drift}%`],
            opacity: [0, particle.opacity, particle.opacity, 0],
            scale: [0.5, 1, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, hsl(28 100% 60%) 0%, hsl(15 90% 45%) 100%)`,
            boxShadow: `0 0 ${particle.size * 3}px hsl(28 100% 50% / 0.6), 0 0 ${particle.size * 6}px hsl(28 100% 50% / 0.3)`,
          }}
        />
      ))}
    </div>
  );
}
