import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Props {
  project: any;
  onClose: () => void;
}

const PortfolioModal = ({ project, onClose }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const images =
    project.gallery_images
      ?.split(",")
      .map((img: string) => img.trim())
      .filter(Boolean) || [];

  // 🔒 Lock body scroll + animate open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        }
      );
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // ⎋ ESC key close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-sm flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* MODAL */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-6xl w-full bg-[#EEE8DC] rounded-2xl
                   px-6 pt-8 pb-10 md:px-10 md:pt-10 md:pb-14
                   overflow-y-auto max-h-[90vh]"
      >
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-start justify-between gap-4">
            {/* Spacer for visual balance */}
            <div className="w-12" />

            {/* TITLE BLOCK */}
            <div className="flex-1 text-center">
              <h3 className="text-xl md:text-2xl tracking-widest uppercase text-[#6F7F86]">
                {project.title}
              </h3>

              {project.sq_feet && (
                <p className="mt-2 text-xs tracking-widest uppercase text-[#6F7F86]/70">
                  {project.sq_feet}
                </p>
              )}

              <p className="mt-2 text-xs tracking-widest uppercase text-[#6F7F86]/60">
                {project.location}
              </p>
            </div>

            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="text-xs tracking-widest uppercase text-[#6F7F86]
                         hover:text-black transition whitespace-nowrap"
            >
              Close ✕
            </button>
          </div>

          <div className="mt-6 h-px w-24 mx-auto bg-[#C8B88A]" />
        </div>

        {/* GALLERY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((src: string) => (
            <div
              key={src}
              className="overflow-hidden rounded-xl
                         shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
            >
              <img
                src={src}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover
                           transition-transform duration-700
                           hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioModal;
