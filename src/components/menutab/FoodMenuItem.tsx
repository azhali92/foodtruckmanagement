import { useCallback, useEffect, useState } from "react";
import type { MenuItem, SizeType } from "../../types/MenuItem";
import type { OrderMenuItem } from "../../types/OrderMenuItem";

type FoodMenuItemProp = {
  item: MenuItem;
  onAddItem: (item: OrderMenuItem) => void;
  onRemoveItem: (item: OrderMenuItem) => void;
  currentOrderItems: OrderMenuItem[];
};

const FoodMenuItem: React.FC<FoodMenuItemProp> = ({ item: menuItm, onAddItem, onRemoveItem, currentOrderItems }) => {
  const isThisItemPresentInCurrentItems = () => {
    return currentOrderItems.some((item1) => item1.item.item_id == menuItm.item_id);
  };

  const getOrderItemFromCurrentOrderItems = () => {
    return currentOrderItems.findIndex((item1) => item1.item.item_id == menuItm.item_id);
  };

  const [currentSelectedSize, setCurrentSelectedSize] = useState<SizeType>(
    isThisItemPresentInCurrentItems() ? currentOrderItems[getOrderItemFromCurrentOrderItems()].size : "S"
  );

  const [specialRequestTxt, setSpecialRequestText] = useState<string>(
    isThisItemPresentInCurrentItems() ? currentOrderItems[getOrderItemFromCurrentOrderItems()].special_request : ""
  );

  const getPriceAsPerSize = () => {
    if (menuItm.category == "Mains" || currentSelectedSize == "S") return menuItm.price;
    if (currentSelectedSize == "M") return menuItm.price_medium ?? menuItm.price;
    if (currentSelectedSize == "L") return menuItm.price_large ?? menuItm.price;
  };

  const onPressAddOrRemove = useCallback(() => {
    const orderItem: OrderMenuItem = {
      item: menuItm,
      size: currentSelectedSize,
      special_request: specialRequestTxt,
    };

    if (isThisItemPresentInCurrentItems()) {
      onRemoveItem(orderItem);
    } else {
      onAddItem(orderItem);
    }
  }, [currentSelectedSize, specialRequestTxt, currentOrderItems]);

  useEffect(() => {
    if (currentOrderItems.length == 0) {
      setCurrentSelectedSize("S");
      setSpecialRequestText("");
    }
  }, [currentOrderItems]);

  return (
    <div className="h-30 bg-yellow-100 p-2 relative flex flex-col">
      <div className="flex flex-row justify-between">
        <div className="font-bold">{menuItm.name}</div>
        <div className="font-bold">{`${getPriceAsPerSize()}$`}</div>
      </div>

      <button
        onClick={onPressAddOrRemove}
        className={`font-bold absolute bottom-2 right-4 ${
          isThisItemPresentInCurrentItems() ? `bg-red-950` : `bg-blue-950`
        } text-white px-2 py-1 rounded-lg`}
      >
        {isThisItemPresentInCurrentItems() ? "Remove" : "Add"}
      </button>
      <input
        value={specialRequestTxt}
        placeholder="Special Request"
        className="bg-white border-1 rounded-md p-1 border-gray-200 mt-2 max-w-[70%]"
        onChange={(e) => setSpecialRequestText(e.target.value)}
        disabled={isThisItemPresentInCurrentItems()}
      ></input>
      {menuItm.category != "Mains" && (
        <div className="self-start mt-2 flex flex-row items-center">
          <div className="mr-3">Size : </div>
          <div className="mr-2">S </div>
          <input
            readOnly
            type="radio"
            checked={currentSelectedSize == "S"}
            onClick={() => setCurrentSelectedSize("S")}
            disabled={isThisItemPresentInCurrentItems()}
          />
          <div className="ml-6 mr-2">M </div>
          <input
            readOnly
            type="radio"
            checked={currentSelectedSize == "M"}
            onClick={() => setCurrentSelectedSize("M")}
            disabled={isThisItemPresentInCurrentItems()}
          />
          <div className="ml-6 mr-2">L </div>
          <input
            readOnly
            type="radio"
            checked={currentSelectedSize == "L"}
            onClick={() => setCurrentSelectedSize("L")}
            disabled={isThisItemPresentInCurrentItems()}
          />
        </div>
      )}
    </div>
  );
};

export default FoodMenuItem;
