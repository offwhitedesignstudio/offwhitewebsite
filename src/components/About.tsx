import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import logo from "../assets/logo.png";
import sagar from "../assets/sagar.jpg";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ================= TITLE =================
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        x: -80,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
      });

      // ================= TEXT =================
      gsap.from(textRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1.1,
        ease: "power3.out",
      });

      // ================= FRAME =================
      gsap.from(frameRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      // ================= LABEL =================
      gsap.from(labelRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // ================= FOUNDERS =================
      gsap.from(teamRef.current?.children || [], {
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.25,
        duration: 1.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const founders = [
    {
      name: "Deepika Malik",
      role: "Creative Director & Design Strategist",
      bio: "The creative compass of Off White Design, Deepika orchestrates spaces through intentional aesthetics, narrative clarity, and disciplined financial stewardship—transforming ideas into cohesive, emotionally resonant realities.",
      image:
        "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      name: "Sagar Pawar",
      role: "Principal of Execution & Technical Director",
      bio: "The technical guardian of the studio’s vision, Sagar translates complex design into enduring form through rigorous site oversight, artisan coordination, and uncompromising execution integrity.",
      image: sagar,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-36 bg-gradient-to-b from-[#EEE8DC] to-[#E3DACB]"
    >
      <div className="container mx-auto px-6 md:px-8">
        {/* ================= ABOUT ================= */}
        <div className="grid md:grid-cols-2 gap-16 md:gap-28 items-center max-w-6xl mx-auto">
          {/* TEXT */}
          <div>
            <p className="text-[11px] tracking-[0.45em] uppercase text-[#9B8F7A] mb-5">
              About The Studio
            </p>

            <h2
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-wide text-[#6F7F86] mb-10"
            >
              Design With Soul,
              <br />
              Built To Endure
            </h2>

            <div ref={textRef} className="space-y-8 max-w-lg">
              <p className="text-[#6F7F86]/90 leading-relaxed text-sm md:text-base">
                Off White Design is a design-led studio where thoughtful
                aesthetics meet purposeful functionality. We believe truly great
                spaces go beyond appearance—they shape emotion, behavior, and
                experience.
              </p>

              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#9B8F7A] mb-2">
                  Our Philosophy
                </p>
                <p className="text-[#6F7F86]/90 leading-relaxed text-sm md:text-base">
                  We don’t chase trends; we design with intention—calm, modern,
                  and quietly luxurious.
                </p>
              </div>

              <div>
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#9B8F7A] mb-2">
                  Our Priority
                </p>
                <p className="text-[#6F7F86]/90 leading-relaxed text-sm md:text-base">
                  To translate vision into spaces that perform beautifully over
                  time and age with confidence.
                </p>
              </div>
            </div>
          </div>

          {/* IMAGE (STATIC) */}
          <div className="relative">
            <div
              ref={frameRef}
              className="absolute -top-6 -left-6 w-full h-full border border-[#C8B88A]/40"
            />
            <div
              className="relative overflow-hidden bg-white shadow-[0_30px_80px_rgba(0,0,0,0.18)] group"
              style={{ aspectRatio: "4 / 5" }}
            >
              <img
                src="https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Studio work"
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div
                ref={labelRef}
                className="absolute bottom-6 left-6 bg-white/95 px-5 py-3"
              >
                <p className="text-[11px] tracking-[0.35em] uppercase text-[#984421]">
                  Studio Philosophy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FOUNDERS ================= */}
        <div ref={teamRef} className="max-w-6xl mx-auto mt-36 text-center">
          <p className="text-[11px] tracking-[0.45em] uppercase text-[#9B8F7A] mb-4">
            The Founders
          </p>

          <h3 className="text-3xl md:text-4xl font-extralight text-[#6F7F86] mb-20">
            Two Pillars of a Single Vision
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 place-items-center">
            {founders.map((member, i) => (
              <div key={i} className="group w-[260px] text-center">
                <div className="relative h-[320px] overflow-hidden rounded-t-full bg-black shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover grayscale transition-transform duration-[2000ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <img
                      src={logo}
                      alt="Brand watermark"
                      className="w-[85%] opacity-[0.22] grayscale"
                    />
                  </div>
                </div>

                <div className="mt-6 px-3">
                  <h4 className="text-sm tracking-wide text-[#6F7F86]">
                    {member.name}
                  </h4>
                  <p className="mt-1 text-[10px] tracking-[0.25em] uppercase text-[#9B8F7A]">
                    {member.role}
                  </p>
                  <p className="mt-4 text-xs leading-relaxed text-[#6F7F86]/80">
                    {member.bio}
                  </p>
                  <span className="block mt-6 mx-auto h-px w-12 bg-[#C8B88A]/70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
