// app/layout.tsx
import type { Metadata } from "next";
// ... other imports ...
import "./globals.css";
import { cn } from "@/lib/utils";
import { AudioProvider } from "./context/AudioContext"; // Import the provider

// ... font definitions ...
import { Inter, Dancing_Script, Square_Peg } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-dancing-script",
});
const squarePeg = Square_Peg({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-square-peg",
});

export const metadata: Metadata = {
  title: "Happy Birthday, Shrey!",
  description: "A special birthday journey created by Lavya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable,
          dancingScript.variable,
          squarePeg.variable
        )}
      >
        {/* Wrap everything in the AudioProvider */}
        <AudioProvider>
          {children}
          {/* Audio tag is now INSIDE the provider */}
        </AudioProvider>
      </body>
    </html>
  );
}
