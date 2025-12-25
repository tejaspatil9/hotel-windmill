"use client";

import { useState } from "react";
import SplashScreen from "./components/splashscreen";
import HotelSection from "./components/hotelsection";

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    // OUTER DESKTOP AREA
    <div className="min-h-screen bg-white flex justify-center">
      
      {/* MOBILE FRAME */}
      <div className="w-full max-w-[420px] min-h-screen bg-white relative">
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <main className="min-h-screen bg-white">
            <HotelSection />
          </main>
        )}
      </div>

    </div>
  );
}
