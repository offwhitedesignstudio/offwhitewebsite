import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const NAV_HEIGHT_MOBILE = 64; // px

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (mobileOpen) return;
      setScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileOpen(false);
  };

  const menuItems = [
    { label: "HOME", id: "home" },
    { label: "ABOUT", id: "about" },
    { label: "SERVICES", id: "services" },
    { label: "PORTFOLIO", id: "portfolio" },
    { label: "CONTACT", id: "contact" },
  ];

  return (
    <>
      {/* ================= NAV BAR ================= */}
      <nav
        className={`
          fixed top-0 left-0 right-0 z-[9998]
          transition-all duration-300
          ${
            scrolled
              ? "bg-white/10 backdrop-blur-xl border-b border-white/20"
              : "bg-transparent"
          }
        `}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-[64px] md:h-[80px] flex items-center justify-between">
          {/* LOGO */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={scrollToHome}
          >
            <img
              src={logo}
              alt="Off White Design"
              className="h-14 sm:h-16 object-contain"
            />

            <div className="flex flex-col items-center leading-none">
              <span
                className={`text-sm sm:text-base font-semibold tracking-[0.25em] ${
                  scrolled ? "text-gray-700" : "text-white"
                }`}
              >
                OFF WHITE
              </span>
              <span
                className={`text-[9px] tracking-[0.45em] mt-1 ${
                  scrolled ? "text-gray-500" : "text-white/60"
                }`}
              >
                Design
              </span>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-10">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group text-sm tracking-widest font-medium ${
                    scrolled ? "text-gray-700" : "text-white"
                  }`}
                >
                  {item.label}
                  <span className="absolute left-1/2 -bottom-1 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full group-hover:left-0" />
                </button>
              </li>
            ))}
          </ul>

          {/* MOBILE TOGGLE */}
          {!mobileOpen && (
            <button
              className={`md:hidden w-10 h-10 flex items-center justify-center transition-colors duration-300 ${
                scrolled ? "text-gray-700" : "text-white"
              }`}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          )}
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div
          className="fixed left-0 right-0 z-[9997] bg-black/95 backdrop-blur-lg flex flex-col"
          style={{
            top: NAV_HEIGHT_MOBILE,
            height: `calc(100vh - ${NAV_HEIGHT_MOBILE}px)`,
          }}
        >
          <div className="flex justify-end px-6 py-6">
            <button
              className="text-white w-10 h-10 flex items-center justify-center"
              onClick={() => setMobileOpen(false)}
            >
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col items-center justify-center gap-10 flex-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-white text-base tracking-[0.4em] font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
