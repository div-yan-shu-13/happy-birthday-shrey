"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MedievalSharp, Inter } from "next/font/google";
import Image from "next/image";

// Instantiate the fonts
const medievalSharp = MedievalSharp({
  subsets: ["latin"],
  weight: ["400"],
});
const inter = Inter({ subsets: ["latin"] });

// Create the MotionButton
const MotionButton = motion(Button);

// --- SLYTHERIN PALETTE ---
const palette = {
  parchmentBg: "/parchment-texture.jpg",
  bgOverlay: "rgba(18, 30, 26, 0.8)",
  textPrimary: "#A5A9B4",
  textSecondary: "#E0E0E0",
  accentGreen: "#0D6247",
  accentGlow: "rgba(13, 98, 71, 0.7)",
  frameBorder: "#2F2F2F",
  frameBg: "rgba(42, 42, 42, 0.3)",
  buttonBg: "#0D6247",
  buttonHover: "#1A8361",
  buttonText: "#E0E0E0",
  pathColor: "#E0E0E0", // Silver for path
  pathGlow: "rgba(224, 224, 224, 0.5)", // Silver glow
};

// --- Timeline Data ---
const timelineData = [
  { src: "/timeline-1.jpg", description: "Fav child actor" },
  { src: "/timeline-2.jpg", description: "Shrey thinking of a way to get out" },
  { src: "/timeline-3.jpg", description: "On an unofficial date" },
  { src: "/timeline-4.jpg", description: "Tryna rizz up" },
  { src: "/timeline-5.jpg", description: "Stars protecting from the rain" },
  { src: "/timeline-6.jpg", description: "Absolute cutie" },
  { src: "/timeline-7.jpg", description: "The movie day" },
  { src: "/timeline-8.jpg", description: "Movie day again" },
  { src: "/timeline-9.jpg", description: "Eepiest eepy person" },
  {
    src: "/timeline-10.jpg",
    description:
      "This one moment when you know you are not a sad story anymore",
  },
];

// --- ROUGH CONSTANTS FOR STATIC PATH ---
const STATIC_SEGMENT_HEIGHT = 420;
const PATH_START_Y = 100;

// --- STATIC PATH FUNCTION ---
const generateStaticPathString = (
  itemCount: number,
  segmentHeight = STATIC_SEGMENT_HEIGHT,
  svgWidth = 96,
  curveAmount = 48,
  startY = PATH_START_Y
) => {
  const midX = svgWidth / 2;
  let d = `M ${midX},${startY}`;
  let yStart = startY;
  for (let i = 0; i < itemCount - 1; i++) {
    const yEnd = startY + (i + 1) * segmentHeight;
    const direction = i % 2 === 0 ? -1 : 1;
    const controlX = midX + curveAmount * direction;
    const cp1y = yStart + segmentHeight / 3;
    const cp2y = yEnd - segmentHeight / 3;
    d += ` C ${controlX},${cp1y} ${controlX},${cp2y} ${midX},${yEnd}`;
    yStart = yEnd;
  }
  d += ` L ${midX},${yStart + segmentHeight / 2}`;
  return d;
};
// --- END STATIC PATH FUNCTION ---

export default function TimelinePage() {
  const router = useRouter();
  const pathD = generateStaticPathString(timelineData.length);

  return (
    <main
      className="min-h-screen w-full relative flex flex-col items-center overflow-x-hidden"
      style={{
        backgroundImage: `url(${palette.parchmentBg})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: palette.bgOverlay }}
      ></div>

      {/* --- Titles --- */}
      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className={`pt-12 pb-2 text-5xl md:text-6xl font-bold text-center drop-shadow z-10 ${medievalSharp.className}`}
        style={{
          color: palette.textPrimary,
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Mischief Managed
      </motion.h2>

      {/* --- ADDED ANIMATION TO SUBTITLE --- */}
      <motion.p
        initial={{ y: -20, opacity: 0 }} // Start slightly higher
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }} // Delay slightly after title
        className={`text-lg text-center mb-6 px-4 italic font-medium drop-shadow z-10 ${medievalSharp.className}`}
        style={{
          color: palette.textSecondary,
          textShadow: "1px 1px 3px rgba(0,0,0,0.09)",
        }}
      >
        Celebrating Your Magical Journey!
      </motion.p>
      {/* --- END SUBTITLE ANIMATION --- */}

      {/* --- Crest (Unchanged) --- */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }} // Slightly increased delay
        className="z-10 mb-10"
      >
        <Image
          src="/slytherin-crest.png"
          alt="Slytherin Crest"
          width={100}
          height={100}
          className="drop-shadow-lg"
        />
      </motion.div>

      <div className="relative w-full max-w-4xl p-8 z-10">
        {/* --- ADDED ANIMATION TO SVG PATH (Desktop) --- */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }} // Appear after crest
          height={PATH_START_Y + timelineData.length * STATIC_SEGMENT_HEIGHT}
          className="absolute left-1/2 top-0 w-24 -translate-x-1/2 hidden md:block"
          style={{ pointerEvents: "none" }}
        >
          <path
            d={pathD}
            stroke={palette.pathColor}
            strokeWidth={2}
            fill="none"
            strokeLinecap="round"
            strokeDasharray="8 4"
            style={{ filter: `drop-shadow(0 0 5px ${palette.pathGlow})` }}
          />
        </motion.svg>
        {/* --- END SVG PATH ANIMATION --- */}

        {/* --- ADDED ANIMATION TO Simple Mobile Line --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }} // Appear after crest
          className="absolute left-1/2 top-0 h-full w-0.5 block md:hidden opacity-30"
          style={{
            backgroundColor: palette.pathColor,
            boxShadow: `0 0 8px ${palette.pathGlow}`,
          }}
        ></motion.div>
        {/* --- END MOBILE LINE ANIMATION --- */}

        {/* Timeline items */}
        <div className="relative flex flex-col gap-12">
          {timelineData.map((item, i) => {
            const isOdd = i % 2 !== 0;
            return (
              <div
                key={i}
                className={`flex w-full ${
                  isOdd ? "md:justify-end" : "justify-start"
                }`}
              >
                <motion.div
                  className={`w-full md:w-1/2 ${
                    isOdd ? "md:pl-8" : "md:pr-8"
                  } text-center`}
                  initial={{ opacity: 0, x: isOdd ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.03, rotate: isOdd ? -1 : 1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Image Frame */}
                    <div
                      className="rounded-lg overflow-hidden cursor-pointer p-1"
                      style={{
                        border: `2px solid ${palette.frameBorder}`,
                        backgroundColor: palette.frameBg,
                        boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                      }}
                    >
                      <Image
                        src={item.src}
                        alt={`Moment ${i + 1}: ${item.description || ""}`}
                        width={400}
                        height={320}
                        style={{ objectFit: "cover" }}
                        className="w-full max-w-sm md:max-w-none h-[320px] object-cover rounded"
                      />
                    </div>

                    {/* Styled Description Block */}
                    {item.description && (
                      <div
                        className="mt-2 p-2 rounded max-w-[90%] mx-auto"
                        style={{
                          backgroundColor: palette.frameBg,
                          border: `1px solid ${palette.frameBorder}`,
                        }}
                      >
                        <p
                          className={`text-sm italic ${inter.className}`}
                          style={{ color: palette.textPrimary, opacity: 0.9 }}
                        >
                          {item.description}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>

                {/* --- DOT REMOVED --- */}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- Button --- */}
      <div className="w-full flex justify-center py-12 z-10">
        <MotionButton
          size="lg"
          className={`px-8 py-6 text-lg rounded-full shadow-lg font-semibold ${medievalSharp.className}`}
          style={{
            backgroundColor: palette.buttonBg,
            color: palette.buttonText,
            border: `2px solid ${palette.accentGreen}`,
            letterSpacing: "0.08em",
            boxShadow: `0 0 10px ${palette.accentGlow}`,
          }}
          whileHover={{
            backgroundColor: palette.buttonHover,
            scale: 1.05,
            boxShadow: `0 0 15px ${palette.accentGlow}`,
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/wishes")}
        >
          Continue the Journey
        </MotionButton>
      </div>
    </main>
  );
}
