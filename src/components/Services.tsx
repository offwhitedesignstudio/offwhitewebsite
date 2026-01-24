"use client";

import { useLayoutEffect, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCategory } from "../context/CategoryContext";
import { useContent } from "../hook/useContent";
import { ICON_MAP } from "../constants/icons";
import ServicesSkeleton from "./ServicesSkeleton";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { selectedServiceId, setService } = useCategory();
  const { services, loading } = useContent();

  const handleServiceClick = (service: any) => {
    setService(service);
    setTimeout(() => {
      document
        .getElementById("portfolio")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        force3D: true,
      });

      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 90%",
          once: true,
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        force3D: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 🔥 Refresh after load
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }
  }, [loading]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-28 relative"
      style={{
        background: `
          linear-gradient(135deg,
            #5f6f6a 0%,
            #788991 35%,
            #8c957e 65%,
            #6b7c86 100%
          )
        `,
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div ref={titleRef} className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-light text-white mb-4">
            Hospitality Interior Design Services
          </h2>
          <p className="text-white/70 text-sm tracking-widest uppercase">
            Select a Category to Filter Portfolio
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto"
        >
          {loading ? (
            <ServicesSkeleton />
          ) : (
            services
              .filter((s) => String(s.isActive).toLowerCase() === "true")
              .sort((a, b) => Number(a.order) - Number(b.order))
              .map((service) => {
                const Icon = ICON_MAP[service.icon];
                const isSelected = selectedServiceId === service.id;

                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceClick(service.id)}
                    className={`service-card group relative h-[520px] w-full
                      rounded-2xl overflow-hidden text-left
                      bg-black
                      shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                      transition-all duration-500 hover:-translate-y-3 will-change-transform
                      ${isSelected ? "scale-[1.02]" : ""}
                    `}
                  >
                    <img
                      loading="lazy"
                      decoding="async"
                      src={service.image}
                      alt={`${service.title} by Off White Design – Hospitality Interior Design Studio`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    <div
                      className={`absolute inset-0 z-10 ${
                        isSelected
                          ? "bg-black/30"
                          : "bg-black/55 group-hover:bg-black/65"
                      }`}
                    />

                    {isSelected && (
                      <div className="absolute inset-0 z-20 border-4 border-white rounded-2xl pointer-events-none" />
                    )}

                    <div className="relative z-30 p-8 h-full flex flex-col justify-between">
                      <div>
                        {Icon && <Icon className="w-12 h-12 text-white mb-6" />}
                        <h3 className="text-2xl font-light text-white whitespace-pre-line">
                          {service.title}
                        </h3>
                      </div>

                      <span className="inline-block bg-white/90 text-[#788991] px-6 py-3 text-xs tracking-widest rounded-full">
                        {service.buttonText}
                      </span>
                    </div>
                  </button>
                );
              })
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
