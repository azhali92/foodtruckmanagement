export type MenuItem = {
  item_id: string;
  name: string;
  price: number;
  price_medium?: number;
  price_large?: number;
  category: MenuType;
  inventory: number;
  lastUpdatedBy: string;
  lastUpdatedAt: number;
};

export type MenuType = "All" | "Mains" | "Sides" | "Drinks";

export type SizeType = "S" | "M" | "L";
