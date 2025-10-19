import type { Metadata } from "next";
// Import the default font you want for the body (e.g., Inter)
// If you don't import one, it will use the system default sans-serif font
import { Inter, Dancing_Script, Square_Peg } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; // Assuming you have shadcn/ui utils

// Default body font
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// Special fonts (make them available as CSS variables)
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
  title: "Happy Birthday, Shrey!", // Set a nice title
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
          "min-h-screen bg-background font-sans antialiased", // Use default font
          inter.variable, // Make Inter variable available
          dancingScript.variable, // Make Dancing Script variable available
          squarePeg.variable // Make Square Peg variable available
        )}
      >
        {children}
      </body>
    </html>
  );
}
