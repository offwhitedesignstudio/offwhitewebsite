import { createContext, useContext, useState, ReactNode } from "react";

interface CategoryContextType {
  selectedServiceId: string | null;
  selectedSubCategoryId: string | null;
  setService: (serviceId: string | null) => void;
  setSubCategory: (subCategoryId: string | null) => void;
}

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
    string | null
  >(null);

  const setService = (serviceId: string | null) => {
    setSelectedServiceId(serviceId);
    setSelectedSubCategoryId(null); // 🔥 reset sub-category on service change
  };

  const setSubCategory = (subCategoryId: string | null) => {
    setSelectedSubCategoryId(subCategoryId);
  };

  return (
    <CategoryContext.Provider
      value={{
        selectedServiceId,
        selectedSubCategoryId,
        setService,
        setSubCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
