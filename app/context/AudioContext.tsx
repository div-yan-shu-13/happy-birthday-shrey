// app/context/AudioContext.tsx
"use client";

import React, {
  createContext,
  useRef,
  useContext,
  ReactNode,
  useState,
} from "react";

interface AudioContextType {
  audioRef: React.RefObject<HTMLAudioElement | null>; // <-- FIX: Allow null here
  isPlaying: boolean;
  playAudio: () => Promise<void>;
  // Add pause/toggle functions if needed later
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement>(null); // useRef can initially be null
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = async () => {
    // Check if audioRef.current exists before playing
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        console.log("Audio playing started via context");
      } catch (error) {
        console.error("Audio play failed via context:", error);
        setIsPlaying(false); // Ensure state reflects failure
      }
    } else if (!audioRef.current) {
      console.error("Audio element ref is not available yet.");
    }
  };

  return (
    <AudioContext.Provider value={{ audioRef, isPlaying, playAudio }}>
      {/* The actual audio element lives here, controlled by the ref */}
      <audio ref={audioRef} src="/shreys-song.mp3" loop hidden preload="auto">
        Your browser does not support the audio element.
      </audio>
      {children}
    </AudioContext.Provider>
  );
};

// Custom hook to use the audio context
export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
