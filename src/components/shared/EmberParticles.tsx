import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
}

export function EmberParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      size: 2 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bottom-0 rounded-full bg-primary opacity-60"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float-up ${particle.duration}s ease-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(28 100% 50% / 0.8)`,
          }}
        />
      ))}
    </div>
  );
}
