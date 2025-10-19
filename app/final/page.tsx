"use client";
import { useState, useEffect } from "react";
import { Dancing_Script } from "next/font/google";
import HeartsBackground from "@/components/ui/HeartsBackground";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: ["700"] });
const MotionButton = motion(Button);

// --- OUR VIBRANT ROMANTIC PALETTE ---
const palette = {
  bgTop: "#FFFBF7",
  bgBottom: "#FBC2C2",
  textPrimary: "#4A2E2E",
  textSecondary: "#6D4C4C",
  textOnButton: "#FFFFFF",
  buttonBg: "#E26D8E",
  buttonHover: "#C95F7F",
  confettiColors: ["#FBC2C2", "#E26D8E", "#C95F7F"], // Pink palette
};

export default function FinalPage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    // Let the final celebration last a bit longer
    const timer = setTimeout(() => setShowConfetti(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main
      className={`min-h-screen w-full flex flex-col items-center justify-center relative overflow-x-hidden`}
      style={{
        background: `linear-gradient(to bottom, ${palette.bgTop}, ${palette.bgBottom})`,
      }}
    >
      <HeartsBackground />

      {/* --- Replaced sparkles with our theme confetti --- */}
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={300} // A few more for the finale
          colors={palette.confettiColors}
        />
      )}

      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center mt-28 mb-12 z-10 px-4"
      >
        {/* Animated Birthday Heart */}
        <motion.div
          initial={{ scale: 0.92 }}
          animate={{ scale: [1, 1.18, 0.96, 1.14, 1] }}
          transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
          className="mb-7"
        >
          <Heart
            className="w-20 h-20"
            style={{ color: palette.buttonBg }} // Use theme color
            fill="currentColor"
          />
        </motion.div>
        <h1
          className={`text-5xl md:text-6xl text-center font-extrabold mb-7 ${dancingScript.className}`}
          style={{ color: palette.textPrimary }}
        >
          Happy Birthday
          <br />
          Shrey!
        </h1>
        <p
          className="text-lg md:text-xl text-center max-w-lg mb-8"
          style={{ color: palette.textPrimary }} // Use theme color
        >
          Here&apos;s to{" "}
          <span className="font-bold">
            another year of laughter, love, and
            <br />
            magical moments with you.
          </span>
          <br />
          Know that you mean the world to everyone who loves you — and
          especially to me.
        </p>
        <motion.p
          className={`mt-2 mb-4 text-3xl italic tracking-wide font-semibold text-center flex items-center gap-2 ${dancingScript.className}`}
          style={{ color: palette.textSecondary }} // Use theme color
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.9 }}
        >
          You are so, so loved.
          {/* --- Replaced emoji with icon --- */}
          <Heart
            size={24}
            style={{ color: palette.buttonBg }}
            fill="currentColor"
          />
        </motion.p>
      </motion.div>

      <div className="w-full flex justify-center py-6 mb-3 z-10">
        <MotionButton
          size="lg"
          className="px-8 py-6 text-lg rounded-full shadow-lg font-semibold"
          style={{
            backgroundColor: palette.buttonBg,
            color: palette.textOnButton,
          }}
          whileHover={{
            backgroundColor: palette.buttonHover,
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/")}
        >
          Replay Journey
        </MotionButton>
      </div>
    </main>
  );
}
