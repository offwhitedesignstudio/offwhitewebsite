import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "../assets/logo.png";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  const [showLoader, setShowLoader] = useState(true);

  useLayoutEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      /* ================= LOADER ================= */
      gsap
        .timeline({
          onComplete: () => {
            setShowLoader(false);
            document.body.style.overflow = "auto";
          },
        })
        .fromTo(
          logoRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" }
        )
        .fromTo(
          brandRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.6"
        )
        .to([logoRef.current, brandRef.current], {
          opacity: 0,
          duration: 0.7,
          delay: 0.6,
          ease: "power2.out",
        })
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });

      /* ================= HERO ================= */
      gsap.set(
        [
          titleRef.current,
          subtitleRef.current,
          buttonRef.current,
          scrollRef.current,
        ],
        { opacity: 0, y: 20 }
      );

      gsap
        .timeline({ delay: 2.6 })
        .to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        })
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.9 }, "-=0.6")
        .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4")
        .to(scrollRef.current, { opacity: 1, duration: 0.8 }, "-=0.3");
    }, heroRef);

    return () => {
      document.body.style.overflow = "auto";
      ctx.revert();
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToService= () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ================= LOADER ================= */}
      {showLoader && (
        <div
          ref={loaderRef}
          className="
            fixed inset-0 z-[9999]
            flex items-center justify-center
            bg-black
            w-screen overflow-hidden
          "
        >
          <div className="flex flex-col items-center gap-3 text-center w-full">
            <img
              ref={logoRef}
              src={logo}
              alt="Off White Design – Hospitality Interior Design Studio"
              className="w-20 sm:w-24 md:w-28 h-auto object-contain mx-auto"
            />

            <div ref={brandRef}>
              <div className="text-white text-xs sm:text-sm tracking-[0.35em] font-medium">
                OFF WHITE
              </div>
              <div className="text-white/60 text-[9px] tracking-[0.45em] mt-1">
                DESIGN
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= HERO ================= */}
      <section
        id="home"
        ref={heroRef}
        className="relative h-screen flex items-center justify-center font-poppins overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* SEO-visible background image */}
        <img
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Boutique hospitality interior design project by Off White Design"
          className="hidden"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-6xl">
          <h1
            ref={titleRef}
            className="
    text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl
    font-normal uppercase tracking-[0.22em]
    text-white mb-5
  "
          >
            WE DESIGN
            <br />
            FOR THE WAY YOU LIVE AND WORK
          </h1>

          <p
            ref={subtitleRef}
            className="
    text-xs sm:text-sm md:text-base lg:text-lg
    text-white/80 tracking-wide leading-relaxed
    mb-8
  "
          >
            Restaurant & Cafe Interior Design for
            <br />
            Boutique Hospitality Projects in India
          </p>

          <button
            ref={buttonRef}
            onClick={scrollToService}
            className="
              relative px-10 py-3
              text-xs tracking-[0.25em] uppercase
              text-white rounded-md
              backdrop-blur-md
              bg-[#9B5A3C]/35
              border border-white/25
              shadow-lg shadow-black/30
              hover:bg-[#9B5A3C]/55
              hover:border-white/40
              transition-all duration-300
            "
          >
            HOSPITALITY PROJECTS
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          onClick={scrollToAbout}
          className="
            absolute bottom-10 left-1/2 -translate-x-1/2
            flex flex-col items-center cursor-pointer
            text-white/80 z-20
          "
        >
          <div className="w-5 h-8 rounded-full border border-white/60 flex justify-center">
            <span className="w-1 h-1.5 bg-white/70 rounded-full mt-1 animate-scrollDot" />
          </div>

          <span className="mt-2 text-[10px] tracking-[0.35em] uppercase">
            Scroll
          </span>
        </div>
      </section>
    </>
  );
};

export default Hero;
