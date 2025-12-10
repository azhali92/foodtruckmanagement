import "./App.css";

import { useEffect, useState } from "react";
import Header, { type Status } from "./components/Header";
import type { Tabs } from "./components/BottomTab";
import BottomTab from "./components/BottomTab";
import FoodMenu from "./components/menutab/FoodMenu";
import Orders from "./components/orderstab/Orders";
import PrintJobs from "./components/printjobstab/PrintJobs";
import { initDb } from "./utils/dbUtil";
import { useAppStore } from "./zustandstore/appstore";

function App() {
  const [operatingStatus, setOperatingStaus] = useState<Status>("OFFLINE");
  const [currentTab, setCurrentTab] = useState<Tabs>("Menu");

  const triggerOnDbUpdate = useAppStore((state) => state.triggerOnDbUpdate);

  const syncDataWithCentralHub = async () => {
    // await syncMenuItemsFromCentralHub();
    // await syncOrdersFromCentralHub();
    // await syncPrintJobsFromCentralHub();
    setOperatingStaus("ONLINE");
    triggerOnDbUpdate();
  };

  useEffect(() => {
    setOperatingStaus("BUSY");
    initDb().then(() => {
      syncDataWithCentralHub();
    });
  }, []);

  return (
    <div className="p-2 h-screen flex flex-col gap-2">
      <Header status={operatingStatus} />

      {currentTab == "Menu" && <FoodMenu />}
      {currentTab == "Orders" && <Orders />}
      {currentTab == "Print Jobs" && <PrintJobs />}

      <BottomTab currentTab={currentTab} onClickTab={(tab) => setCurrentTab(tab)} />
    </div>
  );
}

export default App;
