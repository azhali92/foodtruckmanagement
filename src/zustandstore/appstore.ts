import { create } from "zustand";
import type { OrderMenuItem } from "../types/OrderMenuItem";

interface AppState {
  currentOrderItems: OrderMenuItem[];
  onDbUpdate: boolean;
  setCurrentOrderItems: (orderMenuItem: OrderMenuItem[]) => void;
  triggerOnDbUpdate: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentOrderItems: [],
  onDbUpdate: false,
  setCurrentOrderItems: (orderMenuItems) => set({ currentOrderItems: orderMenuItems }),
  triggerOnDbUpdate: () =>
    set((state) => ({
      onDbUpdate: !state.onDbUpdate,
    })),
}));
