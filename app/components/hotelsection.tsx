"use client";

import Image from "next/image";
import Link from "next/link";

export default function HotelSection() {
  return (
    <section className="w-full px-4 pt-8 bg-white font-lucida">

      <div className="relative mx-auto max-w-md">

        {/* ================= VIDEO WITH CURVE ================= */}
        <div
          className="relative h-[56vh] overflow-hidden shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
          style={{
            clipPath: "ellipse(92% 82% at 50% 18%)",
            borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
          }}
        >
          <video
            src="/welcomewindmill.mp4"
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* ================= CARD ================= */}
        <div className="relative -mt-20 flex justify-center">

          {/* LOGO */}
          <div className="absolute -top-10 z-20">
            <div className="w-20 h-20 rounded-full bg-black flex items-center justify-center shadow-lg">
              <Image
                src="/windmilllogo.png"
                alt="Hotel Logo"
                width={100}
                height={52}
              />
            </div>
          </div>

          {/* CARD */}
          <div className="bg-white rounded-3xl pt-12 pb-5 px-10 w-full shadow-xl">
            <p className="text-xs text-black text-center mb-1">
              Welcome to
            </p>

            <h1 className="text-xl text-black font-semibold text-center mb-1">
              WINDMILL
            </h1>

            <p className="text-xs text-black font-semibold text-center">
              EAT - DRINK - ELEVATE
            </p>
          </div>
        </div>

        {/* ================= CUISINE IMAGE ================= */}
        <div className="mt-20 mb-20 overflow-hidden rounded-2xl">
          <Image
            src="/images/cuisine.jpg"
            alt="Cuisine"
            width={600}
            height={400}
            className="w-full h-[220px] object-cover rounded-2xl"
          />
        </div>

        {/* ================= OUR MENU ================= */}
        <section className="py-8 bg-white">

          <div className="text-center mb-10">
            <h2 className="text-2xl font-medium text-black mb-2">
              Our Menu
            </h2>
            <p className="text-sm text-black">
              Dine like you're being spoiled — because you are.
            </p>
          </div>

          <div
            className="overflow-x-auto scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex gap-6 px-2 w-max">

              {[
                { title: "FOOD", img: "/fdd/food.png" },
                { title: "DRINKS", img: "/fdd/drinks.jpg" },
                { title: "DESSERT", img: "/fdd/desserts.jpg" },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={`/menu?category=${item.title.toLowerCase()}`}
                  className="relative w-[260px] h-[360px] rounded-3xl overflow-hidden flex-shrink-0 shadow-lg"
                >
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute inset-0 bg-black/35" />

                  <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="text-white text-lg tracking-wide">
                      {item.title}
                    </p>
                  </div>
                </Link>
              ))}

            </div>
          </div>
        </section>

        {/* ================= CONTENT SECTIONS ================= */}
        <section className="px-2 py-20 bg-white">
          <div className="space-y-20">

            {[
              {
                title: "Ambience",
                img: "/images/ambiance.jpg",
                text: "An elegant atmosphere designed for memorable evenings.",
              },
              {
                title: "Location",
                img: "/images/windmill.jpeg",
                text: "Chandani chowk, Pune — a serene escape within the city.",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="mb-6 overflow-hidden rounded-2xl">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-[220px] object-cover"
                  />
                </div>

                <h2 className="text-lg text-black mb-3">
                  {item.title}
                </h2>

                <div className="w-10 h-px bg-black mx-auto mb-4"></div>

                <p className="text-sm text-black leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}

          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="pb-12 text-center">
          <p className="text-xs text-black tracking-wide">
            Crafted with care · Windmill
          </p>
        </footer>

      </div>

    </section>
  );
}
