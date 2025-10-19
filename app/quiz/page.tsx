"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import HeartsBackground from "@/components/ui/HeartsBackground";
import { Button } from "@/components/ui/button"; // Assuming shadcn Button
import { useRouter } from "next/navigation";
import { Dancing_Script, Caveat } from "next/font/google"; // Using Caveat for wishes
import { Heart, PartyPopper, Check, X, SmilePlus, Quote } from "lucide-react";

// Create a motion-wrapped version of the Button for animations
const MotionButton = motion(Button);

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["500"],
});

// Using the vibrant romantic palette
const palette = {
  bgTop: "#FFFBF7",
  bgBottom: "#FBC2C2",
  textPrimary: "#4A2E2E",
  textSecondary: "#6D4C4C",
  textOnButton: "#FFFFFF",
  buttonBg: "#E26D8E", // Strong rose for main buttons
  buttonHover: "#C95F7F",
  skipButtonBg: "transparent", // Transparent for skip
  skipButtonText: "#C95F7F", // Darker rose text for skip
  skipButtonBorder: "#E26D8E", // Rose border for skip
  skipButtonHoverBg: "rgba(226, 109, 142, 0.1)", // Light tint on hover
  optionDefaultBg: "rgba(226, 109, 142, 0.1)",
  optionDefaultBorder: "#E26D8E",
  correctBg: "#A8D896",
  correctText: "#3E5C36",
  incorrectBg: "#E0C4C4",
  incorrectText: "#8A5A5A",
  confettiColors: ["#FBC2C2", "#E26D8E", "#C95F7F"],
};

const quizData = [
  // ... your quiz data ...
  {
    question: "Where did our first conversation take place?",
    options: ["LT", "LT lobby", "Ground"],
    correct: 1,
    hint: "Remember our first anatomy test?",
  },
  {
    question: "Which was the first movie we watched together?",
    options: ["Perks of Being a Wallflower", "Before Sunrise", "Pearl"],
    correct: 2,
    hint: "Our first story unfolded with horror!",
  },
  {
    question:
      "And what was the first movie we watched together in cinema hall?",
    options: ["The Eras Tour Movie", "Dunki", "Gadar 2"],
    correct: 0,
    hint: "We met Deeksha that day!",
  },
  {
    question: "Our first spotify listening session was on which date?",
    options: ["19 Jan '23", "19 Feb '23", "28 Feb'23"],
    correct: 0,
    hint: "It happened within our first week of talking!",
  },
  {
    question: "What helped Lavya bond better with Shrey?",
    options: ["Food", "Music", "Both"],
    correct: 2,
    hint: "It takes more than just food or music!",
  },
];

// ... (Animation Variants remain the same) ...
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export default function QuizPage() {
  const [phase, setPhase] = useState<"intro" | "question" | "result">("intro");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  const handleStart = () => setPhase("question");

  const handleOptionClick = (idx: number) => {
    // ... (handleOptionClick logic remains the same) ...
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === quizData[current].correct;
    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
      setTimeout(() => {
        setSelected(null);
        if (current < quizData.length - 1) {
          setCurrent(current + 1);
        } else {
          setPhase("result");
        }
      }, 1800);
    } else {
      setTimeout(() => {
        setSelected(null);
      }, 1800);
    }
  };

  const getOptionStyle = (idx: number) => {
    // ... (getOptionStyle logic remains the same) ...
    if (selected === idx) {
      return idx === quizData[current].correct
        ? {
            backgroundColor: palette.correctBg,
            color: palette.correctText,
            borderColor: palette.correctBg,
          }
        : {
            backgroundColor: palette.incorrectBg,
            color: palette.incorrectText,
            borderColor: palette.incorrectBg,
          };
    }
    return {
      backgroundColor: palette.optionDefaultBg,
      color: palette.textPrimary,
      borderColor: palette.optionDefaultBorder,
    };
  };

  return (
    <main
      className="min-h-screen w-full relative flex flex-col items-center justify-center px-4 overflow-x-hidden" // Added justify-center
      style={{
        background: `linear-gradient(to bottom, ${palette.bgTop}, ${palette.bgBottom})`,
      }}
    >
      <HeartsBackground />

      {/* ... (Confetti logic remains the same) ... */}
      <AnimatePresence>
        {" "}
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50"
          >
            {" "}
            <Confetti
              width={typeof window !== "undefined" ? window.innerWidth : 0}
              height={typeof window !== "undefined" ? window.innerHeight : 0}
              recycle={false}
              numberOfPieces={180}
              colors={palette.confettiColors}
            />{" "}
          </motion.div>
        )}{" "}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ type: "spring", duration: 0.7 }}
            className="w-full max-w-md text-center z-10"
          >
            <h2
              className={`text-4xl md:text-5xl mb-4 ${dancingScript.className}`}
              style={{ color: palette.textPrimary }}
            >
              Our Little Quiz
            </h2>
            <p
              className="text-base mb-8"
              style={{ color: palette.textSecondary }}
            >
              Let&apos;s take a tiny walk down memory lane. Each question is a
              little heart from our story. Ready?
            </p>
            {/* --- BUTTON CONTAINER --- */}
            <div className="flex flex-col items-center gap-4">
              {/* Start Button */}
              <MotionButton
                size="lg"
                className="px-8 py-6 text-lg rounded-full shadow-lg font-semibold w-full max-w-xs" // Added width constraints
                style={{
                  backgroundColor: palette.buttonBg,
                  color: palette.textOnButton,
                }}
                whileHover={{
                  backgroundColor: palette.buttonHover,
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStart}
              >
                Start Quiz
              </MotionButton>

              {/* --- ADDED SKIP BUTTON --- */}
              <MotionButton
                size="sm" // Smaller size
                variant="outline" // Use outline variant
                className="px-6 py-4 text-base rounded-full font-semibold w-full max-w-xs border-2" // Added width constraints, border-2
                style={{
                  backgroundColor: palette.skipButtonBg,
                  color: palette.skipButtonText,
                  borderColor: palette.skipButtonBorder,
                }}
                whileHover={{
                  backgroundColor: palette.skipButtonHoverBg,
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/timeline")} // Navigate to timeline
              >
                Skip Quiz
              </MotionButton>
            </div>
          </motion.div>
        )}
        {/* --- (Question and Result phases remain the same) --- */}
        {phase === "question" && (
          <motion.div
            key={`question-${current}`}
            className="w-full max-w-md z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {" "}
            <div
              className="text-sm text-right mb-2 tracking-wider"
              style={{ color: palette.textSecondary }}
            >
              {" "}
              Question {current + 1} of {quizData.length}{" "}
            </div>{" "}
            <h2
              className="text-xl font-bold mb-8 text-center"
              style={{ color: palette.textPrimary }}
            >
              {" "}
              {quizData[current].question}{" "}
            </h2>{" "}
            <div className="flex flex-col gap-4">
              {" "}
              {quizData[current].options.map((option, idx) => (
                <motion.button
                  key={option}
                  className={`w-full p-4 text-base rounded-full transition-colors font-semibold relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[${palette.bgTop}]`}
                  style={{ ...getOptionStyle(idx) }}
                  whileHover={{ scale: selected === null ? 1.03 : 1 }}
                  whileTap={{ scale: selected === null ? 0.98 : 1 }}
                  disabled={selected !== null}
                  onClick={() => handleOptionClick(idx)}
                >
                  {" "}
                  {option}{" "}
                  <AnimatePresence>
                    {" "}
                    {selected === idx && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                      >
                        {" "}
                        {idx === quizData[current].correct ? (
                          <Check size={24} />
                        ) : (
                          <X size={24} />
                        )}{" "}
                      </motion.div>
                    )}{" "}
                  </AnimatePresence>{" "}
                </motion.button>
              ))}{" "}
            </div>{" "}
            <div className="mt-6 text-center min-h-[50px]">
              {" "}
              <AnimatePresence>
                {" "}
                {selected !== null &&
                  (selected === quizData[current].correct ? (
                    <motion.p
                      key="correct"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="text-lg font-semibold flex items-center justify-center gap-2"
                      style={{ color: palette.correctText }}
                    >
                      {" "}
                      You got it! <SmilePlus size={20} />{" "}
                    </motion.p>
                  ) : (
                    <motion.div
                      key="incorrect"
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                    >
                      {" "}
                      <p
                        className="text-base"
                        style={{ color: palette.textSecondary }}
                      >
                        {" "}
                        <span
                          className="font-semibold"
                          style={{ color: palette.textPrimary }}
                        >
                          Hint:{" "}
                        </span>{" "}
                        <span className="italic">{quizData[current].hint}</span>{" "}
                      </p>{" "}
                    </motion.div>
                  ))}{" "}
              </AnimatePresence>{" "}
            </div>{" "}
          </motion.div>
        )}{" "}
        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="w-full max-w-md text-center z-10"
          >
            {" "}
            <PartyPopper
              size={48}
              className="mx-auto mb-4"
              style={{ color: palette.buttonBg }}
            />{" "}
            <h2
              className={`text-4xl md:text-5xl mb-4 ${dancingScript.className}`}
              style={{ color: palette.textPrimary }}
            >
              {" "}
              Quiz Complete!{" "}
            </h2>{" "}
            <p
              className="text-base mb-8"
              style={{ color: palette.textSecondary }}
            >
              {" "}
              Thank you for all the memories we&apos;ve shared, Shrey. Every
              moment is my favorite. Here&apos;s to so many more adventures
              together.{" "}
            </p>{" "}
            <MotionButton
              size="lg"
              className="px-8 py-6 text-lg rounded-full shadow-lg font-semibold"
              style={{
                backgroundColor: palette.buttonBg,
                color: palette.textOnButton,
              }}
              whileHover={{ backgroundColor: palette.buttonHover, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/timeline")}
            >
              {" "}
              Continue the Journey{" "}
            </MotionButton>{" "}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
