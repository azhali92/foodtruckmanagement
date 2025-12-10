import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type { MenuItem } from "../types/MenuItem";
import type { OrderItem } from "../types/OrdersItem";
import type { PrintJobItem } from "../types/PrintJobItem";
import type { ChangeLogItem } from "../types/ChangeLogItem";

export interface FoodTruckDB extends DBSchema {
  menuitems: {
    key: string;
    value: MenuItem;
    indexes: { "by-name": string; "by-category": string };
  };
  orders: {
    value: OrderItem;
    key: string;
  };
  printjob: {
    value: PrintJobItem;
    key: string;
  };
  changelog: {
    value: ChangeLogItem;
    key: string;
  };
}

export async function initDb() {
  const db = await openDB<FoodTruckDB>("foodtruckdb", 1, {
    upgrade(db) {
      const menuItemStore = db.createObjectStore("menuitems", {
        keyPath: "item_id",
      });
      menuItemStore.createIndex("by-name", "name");
      menuItemStore.createIndex("by-category", "category");
      db.createObjectStore("orders", {
        keyPath: "id",
        autoIncrement: true,
      });
      db.createObjectStore("printjob", {
        keyPath: "id",
        autoIncrement: true,
      });
      db.createObjectStore("changelog", {
        keyPath: "id",
        autoIncrement: true,
      });
    },
  });

  await loadDummyData(db);
}

export async function loadDummyData(db: IDBPDatabase<FoodTruckDB>) {
  const menuItems = await db.getAll("menuitems");
  if (menuItems.length == 0) {
    console.log("Adding!");
    db.add("menuitems", {
      item_id: "1",
      name: "Chicken Burger",
      price: 15,
      category: "Mains",
      inventory: 12,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
    db.add("menuitems", {
      item_id: "2",
      name: "Spicy Chicken Burger",
      price: 17,
      category: "Mains",
      inventory: 10,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
    db.add("menuitems", {
      item_id: "3",
      name: "Veg Rice",
      price: 10,
      category: "Mains",
      inventory: 4,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
    db.add("menuitems", {
      item_id: "4",
      name: "Chicken Rice",
      price: 13,
      category: "Mains",
      inventory: 12,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
    db.add("menuitems", {
      item_id: "5",
      name: "Mutton Noodle",
      price: 11,
      category: "Mains",
      inventory: 12,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
    db.add("menuitems", {
      item_id: "6",
      name: "Fries",
      price: 4,
      price_medium: 5,
      price_large: 6,
      category: "Sides",
      inventory: 46,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
    db.add("menuitems", {
      item_id: "7",
      name: "Ginger Bread",
      price: 2,
      price_medium: 3,
      price_large: 5,
      category: "Sides",
      inventory: 46,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
    db.add("menuitems", {
      item_id: "8",
      name: "Coleslaw",
      price: 7,
      price_medium: 8,
      price_large: 9,
      category: "Sides",
      inventory: 42,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
    db.add("menuitems", {
      item_id: "9",
      name: "Coke",
      price: 3,
      price_medium: 4,
      price_large: 5,
      category: "Drinks",
      inventory: 14,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
    db.add("menuitems", {
      item_id: "10",
      name: "Sprite",
      price: 3,
      price_medium: 4,
      price_large: 5,
      category: "Drinks",
      inventory: 12,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
    db.add("menuitems", {
      item_id: "11",
      name: "Ginger Ale",
      price: 3,
      price_medium: 4,
      price_large: 5,
      category: "Drinks",
      inventory: 15,
      lastUpdatedBy: "self",
      lastUpdatedAt: new Date().getTime(),
    });
  }
}
