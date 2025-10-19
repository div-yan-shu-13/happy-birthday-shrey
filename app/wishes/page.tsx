"use client";
import HeartsBackground from "@/components/ui/HeartsBackground";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import { Heart, Quote } from "lucide-react"; // Import Quote

// Create the MotionButton
const MotionButton = motion(Button);

// Instantiate the font
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});

// --- OUR VIBRANT ROMANTIC PALETTE ---
const palette = {
  bgTop: "#FFFBF7",
  bgBottom: "#FBC2C2",
  textPrimary: "#4A2E2E",
  textSecondary: "#6D4C4C",
  textOnButton: "#FFFFFF",
  buttonBg: "#E26D8E",
  buttonHover: "#C95F7F",
  optionDefaultBg: "rgba(226, 109, 142, 0.1)",
  optionDefaultBorder: "#E26D8E",
};

// --- Emojis removed from messages for consistency ---
const wishesData = [
  {
    sender: "Ayushi",
    message:
      "Another year, another adventure! Cheers to you on your special day! Wishing you a fabulous birthday, Shrey. May your day be filled with laughter and cake!",
  },
  {
    sender: "Megha",
    message:
      "Happy Birthday to one of the best people I know! You're funny, kind, and always ready to help anyone who needs it. People like you make life lighter and happier just by being around. I'm so glad to have a friend like you. Someone who can make me laugh no matter what and who genuinely cares. Once again, happiest birthday, Shrey.",
  },
  {
    sender: "Divyanshu",
    message:
      "Happy Birthday, Shrey! I hope your year ahead is filled with laughter, love, and countless little moments that make you smile. Keep shining and may all your wishes come true!",
  },
  {
    sender: "Deeksha",
    message:
      "Happy birthday son-in-law, to ensure your happiness, keep my daughter satisfied and smiling.",
  },
  {
    sender: "Lavya (the bestie!)",
    message: "To be added later :)",
  },
];

// --- ANIMATION VARIANTS FOR THE WISHES LIST ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Time between each child animating in
      delayChildren: 0.5, // Wait half a second before starting
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    // <-- Transition object removed
    y: 0,
    opacity: 1,
  },
};

export default function WishesPage() {
  const router = useRouter();

  return (
    <main
      className="min-h-screen w-full relative flex flex-col items-center overflow-x-hidden"
      style={{
        background: `linear-gradient(to bottom, ${palette.bgTop}, ${palette.bgBottom})`,
      }}
    >
      <HeartsBackground />

      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="pt-12 pb-2 z-10"
      >
        <h2
          className={`text-4xl md:text-5xl font-bold text-center drop-shadow ${dancingScript.className}`}
          style={{ color: palette.textPrimary }}
        >
          Birthday Wishes For You!
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-lg md:text-xl text-center mt-4 mb-2 font-medium flex items-center justify-center gap-2"
          style={{ color: palette.textSecondary }}
        >
          Your friends have a little something to say
          <Heart size={18} fill={palette.textSecondary} />
        </motion.p>
      </motion.div>

      {/* --- THIS IS THE UPDATED ANIMATION BLOCK --- */}
      <motion.div
        className="w-full max-w-lg px-4 py-6 space-y-8 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {wishesData.map((wish, i) => (
          <motion.div
            key={i}
            variants={itemVariants} // Each child uses the item variant
            className="rounded-lg backdrop-blur-md shadow-xl p-5 flex flex-col"
            style={{
              backgroundColor: palette.optionDefaultBg,
              border: `2px solid ${palette.optionDefaultBorder}`,
            }}
          >
            <div className="flex gap-4">
              <Quote
                className="w-10 h-10 -mt-1 shrink-0"
                style={{ color: palette.textSecondary, opacity: 0.3 }}
                fill="currentColor"
              />
              <blockquote
                className="text-lg font-semibold text-left"
                style={{ color: palette.textPrimary }}
              >
                {wish.message}
              </blockquote>
            </div>
            <p
              className="text-base text-right w-full italic font-bold mt-2"
              style={{ color: palette.textSecondary }}
            >
              — {wish.sender}
            </p>
          </motion.div>
        ))}
      </motion.div>
      {/* --- END OF UPDATE --- */}

      <div className="w-full flex justify-center py-7 z-10">
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
          onClick={() => router.push("/poem")}
        >
          Continue the Journey
        </MotionButton>
      </div>
    </main>
  );
}
