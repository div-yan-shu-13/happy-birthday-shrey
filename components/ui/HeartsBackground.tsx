"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const N = 15;

const heartColors = [
  "#E26D8E", // Strong rose
  "#FBC2C2", // Deeper blush
  "#FFFFFF", // White
  "#C95F7F", // Darker rose
];

interface HeartConfig {
  id: number;
  initialX: number;
  animateX: number;
  delay: number;
  duration: number;
  color: string;
  opacity: number;
}

function getRandomConfigs(n: number, width: number): HeartConfig[] {
  return Array.from({ length: n }).map((_, i): HeartConfig => {
    const duration = 10 + Math.random() * 7;
    return {
      id: i,
      initialX: Math.random() * width,
      animateX: Math.random() * width,
      delay: Math.random() * 5,
      duration: duration,
      color: heartColors[i % heartColors.length],
      opacity: 0.5 + Math.random() * 0.4,
    };
  });
}

export default function HeartsBackground() {
  const [configs, setConfigs] = useState<HeartConfig[]>([]);

  useEffect(() => {
    const initialWidth = window.innerWidth;
    setConfigs(getRandomConfigs(N, initialWidth));

    const handleResize = () => {
      const newWidth = window.innerWidth;
      setConfigs(getRandomConfigs(N, newWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // --- THE FIX ---
    // Change "absolute" to "fixed" here
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {configs.map((cfg: HeartConfig) => (
        <motion.div
          key={cfg.id}
          className="absolute" // Keep this one as 'absolute' inside the fixed parent
          initial={{
            y: "100vh",
            x: cfg.initialX,
            opacity: cfg.opacity,
          }}
          animate={{
            y: "-10vh",
            x: cfg.animateX,
            opacity: cfg.opacity,
          }}
          transition={{
            duration: cfg.duration,
            repeat: Infinity,
            delay: cfg.delay,
            ease: "linear",
          }}
        >
          <Heart
            className="w-7 h-7"
            style={{ color: cfg.color }}
            fill="currentColor"
          />
        </motion.div>
      ))}
    </div>
  );
}
