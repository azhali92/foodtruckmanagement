import { useCallback, useEffect, useState } from "react";
import Filter from "./Filter";
import FoodMenuItem from "./FoodMenuItem";
import type { MenuItem, MenuType } from "../../types/MenuItem";
import { useAppStore } from "../../zustandstore/appstore";
import { createOrder, getAllMenuItems, getMenuItemsBasedOnFilter } from "../../managers/OfflineDataStore";
import type { OrderMenuItem } from "../../types/OrderMenuItem";

const FoodMenu = () => {
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false);

  const onDbUpdate = useAppStore((state) => state.onDbUpdate);

  const [currentFilter, setCurrentFilter] = useState<MenuType>("All");
  const [currentSearchText, setCurrentSearchText] = useState<string>("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const currentOrderItems = useAppStore((state) => state.currentOrderItems);
  const setCurrentOrderItems = useAppStore((state) => state.setCurrentOrderItems);

  const onAddItem = useCallback(
    (orderItem: OrderMenuItem) => {
      setCurrentOrderItems([...currentOrderItems, orderItem]);
    },
    [currentOrderItems]
  );

  const onRemoveItem = useCallback(
    (orderItem: OrderMenuItem) => {
      setCurrentOrderItems(currentOrderItems.filter((item) => orderItem.item.item_id != item.item.item_id));
    },
    [currentOrderItems]
  );

  const toggleDropdown = () => {
    setIsCategoryFilterOpen(!isCategoryFilterOpen);
  };

  const onPlaceOrder = () => {
    createOrder(currentOrderItems);
    setCurrentOrderItems([]);
  };

  useEffect(() => {
    (async () => {
      getAllMenuItems().then((data) => {
        setMenuItems(data);
      });
    })();
  }, [onDbUpdate]);

  const getTotalPrice = () => {
    let total = 0;

    currentOrderItems.forEach((itm) => {
      if (itm.size == "S") total = total + itm.item.price;
      else if (itm.size == "M") total = total + (itm.item.price_medium ?? itm.item.price);
      else if (itm.size == "L") total = total + (itm.item.price_large ?? itm.item.price);
    });

    return total;
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-200 relative">
      <div className="h-12 bg-yellow-50 top-2 right-2 left-2 absolute border-2 rounded-lg z-2">
        <div className="flex flex-row  justify-between h-full items-center px-2">
          <input
            className="flex-1 mr-2 px-2"
            placeholder="Search"
            value={currentSearchText}
            onChange={(e) => setCurrentSearchText(e.target.value)}
          />
          <button
            onClick={toggleDropdown}
            className="bg-amber-950 text-white px-2 py-1.5 font-bold rounded-lg flex flex-row items-center gap-2"
          >
            <div>Filter</div>
            {currentFilter != "All" && <div className="w-2 h-2 bg-red-600 rounded-2xl"></div>}
          </button>
        </div>

        <Filter
          isOpen={isCategoryFilterOpen}
          onClickFilterOption={(itemName) => {
            setCurrentFilter(itemName);
            toggleDropdown();
          }}
          currentFilter={currentFilter}
        />
      </div>

      <div className="absolute top-14 bottom-0 w-full overflow-y-auto p-2 pb-20 space-y-2 rounded-lg">
        {getMenuItemsBasedOnFilter(menuItems, currentSearchText, currentFilter).map((itm) => (
          <FoodMenuItem
            key={itm.item_id}
            item={itm}
            onAddItem={onAddItem}
            onRemoveItem={onRemoveItem}
            currentOrderItems={currentOrderItems}
          />
        ))}
      </div>

      <div className="h-12 bg-yellow-50 bottom-1 right-2 left-2 absolute border-2 rounded-lg">
        <div className="flex flex-row  justify-between h-full items-center px-2">
          <div className="font-bold">{`Total : ${getTotalPrice()}$`}</div>
          <button onClick={onPlaceOrder} className="bg-green-600 text-white px-2 py-1.5 font-bold rounded-lg">
            Place Order{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;
