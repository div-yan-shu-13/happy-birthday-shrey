"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { MedievalSharp } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import Image from "next/image"; // Import the Image component

// Instantiate the new font
const medievalSharp = MedievalSharp({
  subsets: ["latin"],
  weight: ["400"],
});

// Create the MotionButton
const MotionButton = motion(Button);

// --- YOUR SLYTHERIN PALETTE ---
const palette = {
  parchmentBg: "/parchment-texture.jpg", // We are using this now!
  bgOverlay: "rgba(18, 30, 26, 0.8)", // Your 80% opacity overlay
  textPrimary: "#A5A9B4", // Your primary text color
  textSecondary: "#E0E0E0", // Your secondary text color
  accentGreen: "#0D6247", // For buttons
  accentGlow: "rgba(13, 98, 71, 0.7)", // For button glow
  frameBorder: "#2F2F2F",
  frameBg: "rgba(42, 42, 42, 0.3)",
  labelBg: "#2A2A2A",
  labelText: "#E0E0E0",
  buttonBg: "#0D6247",
  buttonHover: "#1A8361",
  buttonText: "#E0E0E0",
  pathColor: "#E0E0E0", // Silver-white for high contrast
  pathGlow: "rgba(224, 224, 224, 0.5)", // A bright, silvery glow
};

const timelineData = [
  // ... your data
  { src: "/timeline-1.jpg", date: "6/3/23" },
  { src: "/timeline-2.jpg", date: "19/3/23" },
  { src: "/timeline-3.jpg", date: "23/6/23" },
  { src: "/timeline-4.jpg", date: "06/08/23" },
  { src: "/timeline-5.jpg", date: "18/10/23" },
  { src: "/timeline-6.jpg", date: "26/12/23" },
  { src: "/timeline-7.jpg", date: "27/5/24" },
  { src: "/timeline-8.jpg", date: "21/06/24" },
  { src: "/timeline-9.jpg", date: "28/09/25" },
];

// --- (All the path logic and constants are unchanged) ---
const DOT_TOP_OFFSET = 32;
const SEGMENT_HEIGHT = 452;
const generatePathString = (
  itemCount: number,
  segmentHeight = SEGMENT_HEIGHT,
  svgWidth = 96,
  curveAmount = 48,
  dotTopOffset = DOT_TOP_OFFSET
) => {
  const midX = svgWidth / 2;
  let d = `M ${midX},${dotTopOffset}`;
  let yStart = dotTopOffset;
  for (let i = 0; i < itemCount - 1; i++) {
    const yEnd = (i + 1) * segmentHeight + dotTopOffset;
    const direction = i % 2 === 0 ? -1 : 1;
    const controlX = midX + curveAmount * direction;
    const cp1y = yStart + segmentHeight / 3;
    const cp2y = yEnd - segmentHeight / 3;
    d += ` C ${controlX},${cp1y} ${controlX},${cp2y} ${midX},${yEnd}`;
    yStart = yEnd;
  }
  return d;
};
// --- END OF UNCHANGED LOGIC ---

export default function TimelinePage() {
  const router = useRouter();
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const pathD = generatePathString(timelineData.length);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

  // --- FIX 1: ADJUSTED SCROLL RANGE ---
  const pathOffset = useTransform(
    scrollYProgress,
    [0.1, 0.9], // Changed from [0.05, 0.95]
    [pathLength, 0]
  );
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <main
      ref={mainRef}
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

      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className={`pt-12 pb-2 text-5xl md:text-6xl font-bold text-center drop-shadow z-10 ${medievalSharp.className}`}
        style={{
          color: palette.textPrimary, // Your color
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        Mischief Managed: Our Story
      </motion.h2>
      <p
        className={`text-lg text-center mb-6 px-4 italic font-medium drop-shadow z-10 ${medievalSharp.className}`}
        style={{
          color: palette.textSecondary, // Your color
          textShadow: "1px 1px 3px rgba(0,0,0,0.09)",
        }}
      >
        &quot;Always.&quot;
      </p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
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
        <svg
          className="absolute left-1/2 top-0 h-full w-24 -translate-x-1/2 hidden md:block"
          style={{ pointerEvents: "none" }}
        >
          <motion.path
            ref={pathRef}
            d={pathD}
            stroke={palette.pathColor}
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`1 ${pathLength > 0 ? 20 : 0}`}
            style={{
              filter: `drop-shadow(0 0 8px ${palette.pathGlow})`,
              strokeDashoffset: pathOffset,
            }}
          />
        </svg>

        <div
          className="absolute left-1/2 top-0 h-full w-0.5 block md:hidden"
          style={{
            // --- FIX 3: USE HIGH-CONTRAST PATH COLOR ---
            backgroundColor: palette.pathColor,
            boxShadow: `0 0 8px ${palette.pathGlow}`,
          }}
        ></div>

        <div className="relative flex flex-col gap-16">
          {timelineData.map((item, i) => {
            const isOdd = i % 2 !== 0;
            return (
              <div
                key={i}
                className={`relative flex w-full ${
                  isOdd ? "md:justify-end" : "justify-start"
                }`}
              >
                <motion.div
                  className={`w-full md:w-1/2 ${
                    isOdd ? "md:pl-8 md:text-left" : "md:pr-8 md:text-right"
                  } text-center`}
                  initial={{ opacity: 0, x: isOdd ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.03, rotate: isOdd ? -1 : 1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="rounded-lg overflow-hidden cursor-pointer p-1"
                      style={{
                        border: `2px solid ${palette.frameBorder}`,
                        backgroundColor: palette.frameBg,
                        boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                      }}
                    >
                      <img
                        src={item.src}
                        alt={`moment-${i + 1}`}
                        className="w-full max-w-sm md:max-w-none h-[320px] object-cover rounded"
                      />
                    </div>

                    <div
                      className={`mt-4 inline-block px-5 py-2 rounded-full text-base font-semibold shadow-md ${medievalSharp.className}`}
                      style={{
                        backgroundColor: palette.labelBg,
                        color: palette.labelText,
                        border: `1px solid ${palette.frameBorder}`,
                        letterSpacing: "0.08em",
                        boxShadow: "2px 2px 8px rgba(0,0,0,0.5)",
                      }}
                    >
                      {item.date}
                    </div>
                  </motion.div>
                </motion.div>

                {/* --- FIX 2: ADD THE DOT BACK --- */}
                <div
                  className="absolute left-1/2 top-8 -translate-x-1/2 w-5 h-5 rounded-full z-0" // top-8 = 32px (DOT_TOP_OFFSET)
                  style={{
                    backgroundColor: palette.pathColor,
                    boxShadow: `0 0 8px ${palette.pathGlow}`,
                    border: `2px solid ${palette.frameBorder}`,
                  }}
                ></div>
                {/* --- END OF DOT --- */}
              </div>
            );
          })}
        </div>
      </div>

      {/* Button (Unchanged) */}
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
