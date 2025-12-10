import type { OrderMenuItem } from "./OrderMenuItem";

export type OrderItem = {
  order_id: string;
  items: OrderMenuItem[];
  lastUpdatedBy: string;
  lastUpdatedAt: string;
};
