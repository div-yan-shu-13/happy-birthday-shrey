"use client";
import HeartsBackground from "@/components/ui/HeartsBackground";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dancing_Script, Square_Peg } from "next/font/google"; // Removed Inter

// Font for headings and signature
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});

// Font for the poem body
const squarePeg = Square_Peg({
  subsets: ["latin"],
  weight: ["400"],
});

// Create the MotionButton
const MotionButton = motion(Button);

// --- OUR VIBRANT ROMANTIC PALETTE ---
const palette = {
  bgTop: "#FFFBF7",
  bgBottom: "#FBC2C2",
  textPrimary: "#4A2E L2E", // Dark brown for the poem
  textSecondary: "#6D4C4C", // Lighter brown for signature
  textOnButton: "#FFFFFF",
  buttonBg: "#E26D8E",
  buttonHover: "#C95F7F",
};

// --- Poem with grammatical fixes AND escaped apostrophes ---
const poem = [
  "When I&apos;m with everyone but you, I&apos;m with no one", // Escaped I'm, I'm
  "You&apos;re the lottery that I have won", // Escaped You're
  "When our eyes meet, and I&apos;m in your arms", // Escaped I'm
  "Suddenly, I am whole, my heart is free",
  "And with every glance, a love song softly starts",
  "",
  "I wonder how you feel this way about me",
  "It&apos;s serendipitous, the miracle of having found you", // Escaped It's
  "Someone who&apos;s everything I&apos;ve ever dreamt of", // Escaped who's, I've
  "How often do dreams come true?",
  "",
  "You&apos;re so fucking pretty I could sit here and cry", // Escaped You're
  "A canvas painted by angels, a masterpiece",
  "I pinch myself, incredulous that you&apos;re mine", // Escaped you're
  "A celestial alignment, a cosmic release",
  "",
  "I love the way your teeth peek from within your smile",
  "And I love the way your eyes get so smol when you laugh",
  "Your existence is so precious, like a rare gem",
  "I thank God for you every day on this world&apos;s behalf", // Escaped world's
  "",
  "Your strength and vulnerability have me awestruck",
  "A paradox of your boldness and your delicate touch",
  "Your hands on me feel like coming home",
  "No wonder I can&apos;t help but adore you so much", // Escaped can't
  "",
  "My life took a turn when you called me your dream girl",
  "And I pondered the rarity of dreams coming true",
  "Yet you, my love, are the dream I never dared",
  "Since life before you was so broken and blue",
  "",
  "My lips on yours, like a honeybee sipping nectar",
  "Like it has finally found the flower it loves the most",
  "Losing myself in your taste for an eternity",
  "I wouldn&apos;t let go of it at any cost", // Escaped wouldn't
  "",
  "All my life, fake smiling, laughing alone",
  "So used to being on my own",
  "Now we laugh until my ribs get tough",
  "And I know it will never be enough",
  "",
  "You give meaning to my existence",
  "Loving you has become the anchor of my life",
  "Even if storms rage, and tides pull us apart",
  "I will find you, love you, and never let anything break your precious heart",
];

export default function PoemPage() {
  const router = useRouter();

  return (
    <main
      // Removed Inter font
      className={`min-h-screen w-full relative flex flex-col items-center overflow-x-hidden`}
      style={{
        background: `linear-gradient(to bottom, ${palette.bgTop}, ${palette.bgBottom})`,
      }}
    >
      <HeartsBackground />

      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="w-full flex flex-col items-center pt-16 pb-10 px-5 z-10"
      >
        <motion.h2
          // Title uses Dancing Script
          className={`text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-center ${dancingScript.className}`}
          style={{ color: palette.textPrimary }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          For You, My Dream
        </motion.h2>

        {/* Animation fixed: Fades in as one block */}
        <motion.div
          className="w-full max-w-xl px-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {poem.map((line, i) =>
            line.length === 0 ? (
              <br key={i} />
            ) : (
              // This is now a regular <p>
              <p
                key={i}
                // Poem lines use Square Peg
                className={`text-2xl md:text-3xl leading-relaxed mb-2 text-center ${squarePeg.className}`}
                style={{
                  color: palette.textPrimary,
                  fontWeight: 400,
                }}
              >
                {line}
              </p>
            )
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          // Signature uses Dancing Script
          className={`mt-7 text-2xl italic ${dancingScript.className}`}
          style={{ color: palette.textSecondary }}
        >
          — Lavya
        </motion.div>
      </motion.div>

      <div className="w-full flex justify-center py-6 z-10">
        <MotionButton
          size="lg"
          // Button uses default font
          className={`px-8 py-6 text-lg rounded-full shadow-lg font-semibold`}
          style={{
            backgroundColor: palette.buttonBg,
            color: palette.textOnButton,
          }}
          whileHover={{
            backgroundColor: palette.buttonHover,
            scale: 1.05,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/final")}
        >
          Continue the Journey
        </MotionButton>
      </div>
    </main>
  );
}
