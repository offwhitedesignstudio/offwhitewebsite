import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useCategory } from "../context/CategoryContext";
import { useContent } from "../hook/useContent";

import PortfolioSkeleton from "./PortfolioSkeleton";
import PortfolioModal from "./PortfolioModal";
import SubCategoryGrid from "./SubCategoryGrid";

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { selectedServiceId, selectedSubCategoryId, setSubCategory } =
    useCategory();

  const { services, portfolio, serviceSubCategories, loading } = useContent();

  const [activeProject, setActiveProject] = useState<any | null>(null);

  const selectedService = useMemo(
    () => services.find((s) => s.id === selectedServiceId),
    [services, selectedServiceId]
  );

  const subCategoriesForService = useMemo(
    () =>
      serviceSubCategories.filter(
        (sc) =>
          sc.service_id === selectedServiceId &&
          String(sc.isActive).toLowerCase() === "true"
      ),
    [serviceSubCategories, selectedServiceId]
  );

  const hasSubCategories =
    String(selectedService?.hasSubCategory).toLowerCase() === "true" &&
    subCategoriesForService.length > 0;

  // 🔹 GSAP (run once)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        force3D: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 🔹 Refresh ScrollTrigger after data/filter changes
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [loading, selectedServiceId, selectedSubCategoryId]);

  // 🔹 Summary animation
  useEffect(() => {
    if (selectedService && summaryRef.current) {
      gsap.fromTo(
        summaryRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }
  }, [selectedService]);

  // 🔹 Portfolio filtering logic
  const filteredProjects = useMemo(() => {
    // Initial load → show all works
    if (!selectedServiceId) return portfolio;

    // Service has sub-categories AND one is selected
    if (hasSubCategories && selectedSubCategoryId) {
      return portfolio.filter(
        (p) =>
          p.category === selectedServiceId &&
          p.sub_category_id === selectedSubCategoryId
      );
    }

    // Service has NO sub-categories → show all its works
    if (!hasSubCategories) {
      return portfolio.filter((p) => p.category === selectedServiceId);
    }

    // Service has sub-categories but none selected yet
    return [];
  }, [portfolio, selectedServiceId, selectedSubCategoryId, hasSubCategories]);

  return (
    <>
      <section
        id="portfolio"
        ref={sectionRef}
        className="py-20 md:py-28 bg-gradient-to-b from-[#EEE8DC] to-[#E3DACB]"
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* TITLE */}
          <div ref={titleRef} className="text-center mb-14 md:mb-20">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-[0.25em] text-[#6F7F86]">
              Hospitality Interior Design Projects
            </h2>
            <div className="mt-4 h-px w-24 mx-auto bg-[#C8B88A]" />
          </div>

          {/* SERVICE SUMMARY */}
          {!loading && selectedService && (
            <div
              ref={summaryRef}
              className="max-w-4xl mx-auto mb-20 text-center"
            >
              <h3 className="text-xl md:text-2xl tracking-widest uppercase text-[#6F7F86]">
                {selectedService.title.replace("\n", " ")}
              </h3>
              <div className="mt-4 h-px w-20 mx-auto bg-[#C8B88A]" />
              <p className="mt-6 text-[#6F7F86]/80 text-sm md:text-base">
                {selectedService.summary}
              </p>
            </div>
          )}
          {/* BACK BUTTON (ONLY WHEN SUB-CATEGORY IS ACTIVE) */}
          {hasSubCategories && selectedSubCategoryId && (
            <div className="max-w-7xl mx-auto mb-12 flex justify-center md:justify-start">
              <button
                onClick={() => {
                  setSubCategory(null);
                  requestAnimationFrame(() => {
                    document
                      .getElementById("portfolio")
                      ?.scrollIntoView({ behavior: "smooth" });
                  });
                }}
                className="
        flex items-center gap-3
        text-xs tracking-widest uppercase
        text-[#6F7F86]
        hover:text-black
        transition-colors
      "
              >
                <span className="text-lg leading-none">←</span>
                Back to Categories
              </button>
            </div>
          )}

          {/* SUB-CATEGORY GRID */}
          {hasSubCategories && !selectedSubCategoryId && (
            <SubCategoryGrid subCategories={subCategoriesForService} />
          )}

          {/* PORTFOLIO GRID */}
          {!hasSubCategories || selectedSubCategoryId ? (
            <div
              ref={gridRef}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto"
            >
              {loading ? (
                <PortfolioSkeleton />
              ) : (
                filteredProjects
                  .filter((p) => String(p.isActive).toLowerCase() === "true")
                  .sort((a, b) => Number(a.order) - Number(b.order))
                  .map((project) => (
                    <div
                      key={project.id}
                      className="portfolio-item group flex flex-col items-center cursor-pointer will-change-transform"
                      onClick={() => setActiveProject(project)}
                    >
                      <div className="relative w-full h-[220px] md:h-[260px] overflow-hidden bg-white rounded-t-full shadow-[0_25px_60px_rgba(0,0,0,0.18)]">
                        <img
                          src={project.image}
                          alt={`${project.title}, ${project.location}`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />

                        <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <h3 className="text-sm tracking-widest uppercase text-white">
                            {project.title}
                          </h3>

                          {project.sq_feet && (
                            <p className="mt-2 text-[11px] tracking-widest uppercase text-white/90">
                              {project.sq_feet}
                            </p>
                          )}

                          <span className="mt-3 h-px w-8 bg-white/70" />

                          <p className="text-[11px] mt-3 tracking-widest uppercase text-white/80">
                            {project.location}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 text-center max-w-[140px]">
                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#6F7F86]">
                          {project.title}
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
          ) : null}
        </div>
      </section>

      {/* MODAL */}
      {activeProject && (
        <PortfolioModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </>
  );
};

export default Portfolio;
