import { openDB } from "idb";
import type { Status } from "../components/Header";
import type { MenuItem, MenuType } from "../types/MenuItem";
import type { FoodTruckDB } from "../utils/dbUtil";
import type { OrderItem } from "../types/OrdersItem";
import type { PrintJobItem } from "../types/PrintJobItem";
import type { OrderMenuItem } from "../types/OrderMenuItem";
import { v4 as uuidv4 } from "uuid";

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

export const getAllOrders = async (): Promise<OrderItem[]> => {
  const db = await openDB<FoodTruckDB>("foodtruckdb", 1);
  const items = await db.getAll("orders");
  return items;
};

export const getAllPrintOrders = async (): Promise<PrintJobItem[]> => {
  const db = await openDB<FoodTruckDB>("foodtruckdb", 1);
  const items = await db.getAll("printjob");
  return items;
};

export const createOrder = async (items: OrderMenuItem[]) => {
  const db = await openDB<FoodTruckDB>("foodtruckdb", 1);
  db.add("orders", {
    order_id: uuidv4(),
    items: items,
    lastUpdatedBy: "self",
    lastUpdatedAt: new Date().getTime(),
  });
};

export const createPrintJob = async (item: OrderItem) => {
  const db = await openDB<FoodTruckDB>("foodtruckdb", 1);
  db.add("printjob", {
    print_job_id: uuidv4(),
    data: item,
    type: "RECEIPT",
  });
};

export const deleteOrder = async (order_id: string) => {
  const db = await openDB<FoodTruckDB>("foodtruckdb", 1);
  await db.delete("orders", order_id);
};

export const getMenuItemsBasedOnFilter = (items: MenuItem[], name: string, category: MenuType): MenuItem[] => {
  const nameLower = name.trim().toLowerCase();

  return items.filter((item) => {
    const matchesName = nameLower.length === 0 || item.name.toLowerCase().includes(nameLower);

    const matchesCategory = category === "All" || item.category === category;

    return matchesName && matchesCategory;
  });
};
