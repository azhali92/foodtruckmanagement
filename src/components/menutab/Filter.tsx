import React from "react";
import type { MenuType } from "../../types/MenuItem";

type FilterPropTypes = {
  isOpen: boolean;
  onClickFilterOption: (itemName: MenuType) => void;
  currentFilter: MenuType;
};

const Filter = ({ isOpen, onClickFilterOption, currentFilter }: FilterPropTypes): React.ReactNode => {
  if (!isOpen) return <></>;

  return (
    <div
      className="absolute top-12 right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
    >
      <div className="py-1" role="none">
        <button
          className="block px-4 py-2 text-sm text-gray-700 w-full text-start"
          role="menuitem"
          onClick={() => onClickFilterOption("All")}
        >
          All
        </button>
        <button
          className="px-4 py-2 text-sm text-gray-700 flex flex-row items-center gap-2 w-full text-start"
          role="menuitem"
          onClick={() => onClickFilterOption("Mains")}
        >
          Mains
          {currentFilter == "Mains" && <div className="w-2 h-2 bg-red-600 rounded-2xl"></div>}
        </button>
        <button
          className="px-4 py-2 text-sm text-gray-700 flex flex-row items-center gap-2 w-full text-start"
          role="menuitem"
          onClick={() => onClickFilterOption("Sides")}
        >
          Sides
          {currentFilter == "Sides" && <div className="w-2 h-2 bg-red-600 rounded-2xl"></div>}
        </button>
        <button
          className="px-4 py-2 text-sm text-gray-700 flex flex-row items-center gap-2 w-full text-start"
          role="menuitem"
          onClick={() => onClickFilterOption("Drinks")}
        >
          Drinks
          {currentFilter == "Drinks" && <div className="w-2 h-2 bg-red-600 rounded-2xl"></div>}
        </button>
      </div>
    </div>
  );
};

export default React.memo(Filter);
