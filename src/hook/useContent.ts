import { useEffect, useState } from "react";
import { fetchSheetData } from "../utils/googleSheet";

const SHEET_ID = "18EDlxENDJlbiYR1nPigJ__9PJqyhYco7xUbKyWrkGVc";

export const useContent = () => {
  const [services, setServices] = useState<any[]>([]);
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [serviceSubCategories, setServiceSubCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [servicesData, portfolioData, subCategoryData] =
          await Promise.all([
            fetchSheetData(SHEET_ID, "service"),
            fetchSheetData(SHEET_ID, "portfolio"),
            fetchSheetData(SHEET_ID, "service_sub_categories"),
          ]);

        setServices(servicesData);
        setPortfolio(portfolioData);
        setServiceSubCategories(subCategoryData);
      } catch (error) {
        console.error("Failed to load content from Google Sheets", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return {
    services,
    portfolio,
    serviceSubCategories,
    loading,
  };
};
