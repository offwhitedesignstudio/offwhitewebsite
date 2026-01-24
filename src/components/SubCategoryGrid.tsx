// components/SubCategoryGrid.tsx
import { useCategory } from "../context/CategoryContext";

interface SubCategoryGridProps {
  subCategories: any[];
}

const SubCategoryGrid = ({ subCategories }: SubCategoryGridProps) => {
  const { setSubCategory } = useCategory();

  if (!subCategories.length) return null;

  return (
    <div className="mb-24">
      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto transition-all duration-500">
        {subCategories.map((sc) => (
          <div
            key={sc.id}
            onClick={() => {
              setSubCategory(sc.id);
              setTimeout(() => {
                document
                  .getElementById("portfolio")
                  ?.scrollIntoView({ behavior: "smooth" });
              }, 300);
            }}
            className="group cursor-pointer w-[260px] sm:w-[280px]"
          >
            <div className="relative h-[220px] overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
              <img
                src={sc.image}
                alt={sc.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                <h3 className="text-white tracking-widest uppercase text-sm text-center px-4">
                  {sc.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubCategoryGrid;
