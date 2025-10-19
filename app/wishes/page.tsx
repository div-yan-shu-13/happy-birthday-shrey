"use client";
import HeartsBackground from "@/components/ui/HeartsBackground";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import { Heart } from "lucide-react"; // Import Heart icon

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
  optionDefaultBg: "rgba(226, 109, 142, 0.1)", // A light tint of the new rose
  optionDefaultBorder: "#E26D8E", // Use the strong rose for the border
};

const wishesData = [
  {
    sender: "Aarav",
    message:
      "Happy Birthday, Shrey! Here's to many more memories, inside jokes, and crazy adventures together.",
  },
  {
    sender: "Priya",
    message:
      "Wishing you the happiest birthday, Shrey! You're sunshine on the cloudiest days. Have the best year ahead!",
  },
  {
    sender: "Lavya (the bestie!)",
    message:
      "You're the peanut butter to my jelly, the best listener and even better friend. Happy birthday, Shrey!",
  },
  // ... add more wishes here
];

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

      <div className="w-full max-w-lg px-4 py-6 space-y-8 z-10">
        {wishesData.map((wish, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
            className="rounded-2xl backdrop-blur-md shadow-xl p-5 flex flex-col items-center"
            style={{
              backgroundColor: palette.optionDefaultBg,
              borderColor: palette.optionDefaultBorder,
              borderWidth: "2px",
            }}
          >
            <div
              className="text-lg font-semibold text-center mb-2"
              style={{ color: palette.textPrimary }}
            >
              &quot;{wish.message}&quot;
            </div>
            <div
              className="text-base text-right w-full italic font-bold mt-2"
              style={{ color: palette.textSecondary }}
            >
              — {wish.sender}
            </div>
          </motion.div>
        ))}
      </div>

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
