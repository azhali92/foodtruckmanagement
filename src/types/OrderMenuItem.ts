import type { MenuItem, SizeType } from "./MenuItem";

export type OrderMenuItem = {
  item: MenuItem;
  size: SizeType;
  special_request: string;
};
