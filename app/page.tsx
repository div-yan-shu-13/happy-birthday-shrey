"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import styles from "./Home.module.css"; // Import the CSS Module

// Create a motion-wrapped version of the Button
const MotionButton = motion(Button);

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});

// The palette remains the same
const palette = {
  textPrimary: "#4A2E2E",
  textSecondary: "#8A5A5A",
  textOnButton: "#FFFFFF",
  buttonBg: "#D89696",
  buttonHover: "#B06A6A",
  accentHeart1: "#FFFFFF",
  accentHeart2: "#FADCD9",
  accentHeart3: "#E8A0A0",
  confettiColors: ["#FADCD9", "#E8A0A0", "#B06A6A"],
  footerText: "#8A5A5A",
  overlay: "rgba(255, 251, 247, 0.1)",
};

// Define a type for our heart properties
type HeartProps = {
  id: number;
  initialX: number;
  initialOpacity: number;
  animateX: number;
  animateOpacity: number;
  duration: number;
  delay: number;
};

export default function Home() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });
  const [hearts, setHearts] = useState<HeartProps[]>([]);
  const router = useRouter();

  useEffect(() => {
    // ... (useEffect logic remains the same) ...
    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;
    setWindowDimension({ width: initialWidth, height: initialHeight });
    const generatedHearts = [...Array(12)].map((_, i) => ({
      id: i,
      initialX: Math.random() * initialWidth,
      initialOpacity: 0.7 + Math.random() * 0.3,
      animateX: Math.random() * initialWidth,
      animateOpacity: 0.6 + Math.random() * 0.4,
      duration: 12 + Math.random() * 8,
      delay: i * 1.25,
    }));
    setHearts(generatedHearts);
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setWindowDimension({ width: newWidth, height: newHeight });
      setHearts((currentHearts) =>
        currentHearts.map((heart) => ({
          ...heart,
          initialX: Math.random() * newWidth,
          animateX: Math.random() * newWidth,
        }))
      );
    };
    window.addEventListener("resize", handleResize);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main
      // Apply CSS module class for background handling
      // Use justify-center again as the mobile image handles layout
      className={`flex flex-col items-center justify-center min-h-screen relative overflow-hidden px-4 ${styles.backgroundImage}`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: palette.overlay }}
      ></div>

      {/* ... (Rest of the code: Hearts, Confetti, Content, Footer remains the same) ... */}
      {/* Floating Hearts Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            initial={{
              y: "100vh",
              x: heart.initialX,
              opacity: heart.initialOpacity,
            }}
            animate={{
              y: "-10vh",
              x: heart.animateX,
              opacity: heart.animateOpacity,
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
              ease: "linear",
            }}
          >
            <Heart
              className="w-7 h-7"
              style={{
                color: [
                  palette.accentHeart1,
                  palette.accentHeart2,
                  palette.accentHeart3,
                ][heart.id % 3],
              }}
              fill="currentColor"
            />
          </motion.div>
        ))}
      </div>

      {/* Animated Confetti */}
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={200}
          colors={palette.confettiColors}
        />
      )}

      {/* Main Content */}
      <motion.div
        // Added negative top margin for mobile, reset for desktop
        className="z-10 flex flex-col items-center -mt-85 md:mt-5"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1
          className={`text-5xl md:text-6xl mb-4 text-center ${dancingScript.className}`}
          style={{
            color: palette.textPrimary,
            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
        >
          Happy Birthday, Shrey!
        </motion.h1>

        <motion.p
          className="text-lg text-center mb-8 px-4 font-medium"
          style={{
            color: palette.textSecondary,
            textShadow: "0 1px 6px rgba(0,0,0,0.1)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          A special journey made just for you
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <MotionButton
            size="lg"
            className="flex items-center gap-2 px-8 py-6 text-lg rounded-full shadow-lg font-semibold"
            style={{
              backgroundColor: palette.buttonBg,
              color: palette.textOnButton,
            }}
            whileHover={{
              backgroundColor: palette.buttonHover,
              scale: 1.05,
              boxShadow: "0 10px 20px -5px rgba(0,0,0,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={() => router.push("/quiz")}
          >
            <Heart className="w-5 h-5 mr-1" fill="currentColor" />
            <span className="tracking-wide">Start the Journey</span>
          </MotionButton>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-6 left-0 w-full flex justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span
          className="flex items-center gap-1.5 text-sm font-semibold"
          style={{
            color: palette.footerText,
            textShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          Made with
          <Heart
            className="w-4 h-4"
            style={{ color: palette.buttonBg }}
            fill="currentColor"
          />
          by Lavya & Executed by Divyanshu :)
        </span>
      </motion.div>
    </main>
  );
}
