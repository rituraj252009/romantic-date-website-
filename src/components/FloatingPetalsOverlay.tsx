import React, { useEffect, useState } from 'react';

interface PetalItem {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotate: number;
  sway: number;
  opacity: number;
}

export const FloatingPetalsOverlay: React.FC = () => {
  const [petals, setPetals] = useState<PetalItem[]>([]);

  useEffect(() => {
    // Generate 25 romantic floating rose petals
    const newPetals: PetalItem[] = [];
    for (let i = 0; i < 25; i++) {
      newPetals.push({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 22,
        duration: 9 + Math.random() * 11,
        delay: Math.random() * 8,
        rotate: Math.random() * 360,
        sway: (Math.random() - 0.5) * 60,
        opacity: 0.35 + Math.random() * 0.45,
      });
    }
    setPetals(newPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-1 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.25}px`,
            opacity: petal.opacity,
            animation: `petalFall ${petal.duration}s linear ${petal.delay}s infinite`,
            transform: `rotate(${petal.rotate}deg)`,
          }}
          className="absolute -top-12 rounded-[50%_0_50%_50%] bg-gradient-to-br from-rose-500 via-rose-600 to-rose-900 shadow-[0_2px_8px_rgba(225,29,72,0.4)]"
        />
      ))}

      <style>{`
        @keyframes petalFall {
          0% {
            transform: translateY(0) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(40px);
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(110vh) rotate(360deg) translateX(-40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
