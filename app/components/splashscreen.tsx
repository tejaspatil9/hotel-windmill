"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
   <div className="absolute inset-0 z-50 bg-black splash-screen">

      {/* VIDEO */}
      <video
        src="/windmillintro_silent.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-[75vh] max-h-[600px] mx-auto aspect-[3/4] object-contain"
      />

      {/* DARK OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/70" />

      {/* TEXT */}
      <div className="relative z-10 text-center text-white mt-[-12px] font-windmill">

        {/* Welcome text */}
        <motion.p
          className="text-lg tracking-widest font-medium text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.35)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          WELCOME TO
        </motion.p>

        {/* WINDMILL */}
        <motion.div
          className="flex items-center justify-center text-[42px] mt-2 gap-1 font-semibold text-white drop-shadow-[0_4px_18px_rgba(255,255,255,0.45)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <span>W</span>
          <span>I</span>
          <span>N</span>
          <span>D</span>
          <span>M</span>

          <Image
            src="/icons/windmill.svg"
            alt="Windmill"
            width={28}
            height={28}
            className="invert drop-shadow-md"
          />

          <span>L</span>
          <span>L</span>
        </motion.div>
      </div>
    </div>
  );
}
