export type Tabs = "Menu" | "Orders" | "Print Jobs";

type BottomTabPropTypes = {
  currentTab: Tabs;
  onClickTab: (tab: Tabs) => void;
};

const BottomTab = ({ currentTab, onClickTab }: BottomTabPropTypes): React.ReactNode => {
  return (
    <div className="bg-blue-50 h-13 flex flex-row justify-around py-2">
      <button
        onClick={() => onClickTab("Menu")}
        className={`${
          currentTab == "Menu" ? `bg-amber-400 text-black` : `bg-amber-100 text-gray-400`
        } flex flex-col justify-center px-3 rounded-lg`}
      >
        Menu
      </button>
      <button
        onClick={() => onClickTab("Orders")}
        className={`${
          currentTab == "Orders" ? `bg-amber-400 text-black` : `bg-amber-100 text-gray-400`
        } flex flex-col justify-center px-3 rounded-lg`}
      >
        Orders
      </button>
      <button
        onClick={() => onClickTab("Print Jobs")}
        className={`${
          currentTab == "Print Jobs" ? `bg-amber-400 text-black` : `bg-amber-100 text-gray-400`
        } flex flex-col justify-center px-3 rounded-lg`}
      >
        Print Jobs
      </button>
    </div>
  );
};

export default BottomTab;
