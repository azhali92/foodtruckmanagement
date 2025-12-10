import type { OrderItem } from "./OrdersItem";
import type { PrintJobItem } from "./PrintJobItem";

export type ChangeLogItem = {
  change_id: string;
  createdby: string;
  change_type: ChangeType;
  data: OrderItem | PrintJobItem;
  synced: boolean;
};

export type ChangeType = "CREATE_ORDER" | "DELETE_ORDER" | "MODIFY_ORDER" | "CREATE_PRINT_JOB" | "CANCEL_PRINT_JOB";
