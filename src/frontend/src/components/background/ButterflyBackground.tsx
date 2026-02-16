import { useEffect, useState } from 'react';

interface Butterfly {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

export default function ButterflyBackground() {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);

  useEffect(() => {
    const newButterflies: Butterfly[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10,
      size: 20 + Math.random() * 15,
    }));
    setButterflies(newButterflies);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20" aria-hidden="true">
      {butterflies.map((butterfly) => (
        <div
          key={butterfly.id}
          className="absolute animate-butterfly"
          style={{
            left: `${butterfly.x}%`,
            top: `${butterfly.y}%`,
            animationDelay: `${butterfly.delay}s`,
            animationDuration: `${butterfly.duration}s`,
          }}
        >
          <svg
            width={butterfly.size}
            height={butterfly.size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary/30"
          >
            <path
              d="M12 4C10 4 8 6 8 8C8 10 10 12 12 12C14 12 16 10 16 8C16 6 14 4 12 4Z"
              fill="currentColor"
            />
            <path
              d="M6 10C4 10 2 12 2 14C2 16 4 18 6 18C8 18 10 16 10 14C10 12 8 10 6 10Z"
              fill="currentColor"
            />
            <path
              d="M18 10C16 10 14 12 14 14C14 16 16 18 18 18C20 18 22 16 22 14C22 12 20 10 18 10Z"
              fill="currentColor"
            />
            <path
              d="M12 12C10 12 8 14 8 16C8 18 10 20 12 20C14 20 16 18 16 16C16 14 14 12 12 12Z"
              fill="currentColor"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
