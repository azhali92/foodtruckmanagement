import { openDB } from "idb";
import type { Status } from "../components/Header";
import type { MenuItem, MenuType } from "../types/MenuItem";
import type { FoodTruckDB } from "../utils/dbUtil";

const syncAllDataWithCentralHub = async (callback: (status: Status) => void) => {
  // await syncMenuItemsFromCentralHub();
  // await syncOrdersFromCentralHub();
  // await syncPrintJobsFromCentralHub();
  callback("ONLINE");
};

export const getAllMenuItems = async (): Promise<MenuItem[]> => {
  const db = await openDB<FoodTruckDB>("foodtruckdb", 1);
  const items = await db.getAll("menuitems");
  return items;
};

export const getMenuItemsBasedOnFilter = (items: MenuItem[], name: string, category: MenuType): MenuItem[] => {
  const nameLower = name.trim().toLowerCase();

  return items.filter((item) => {
    const matchesName = nameLower.length === 0 || item.name.toLowerCase().includes(nameLower);

    const matchesCategory = category === "All" || item.category === category;

    return matchesName && matchesCategory;
  });
};
