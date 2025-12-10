import { useEffect, useState } from "react";
import PrintJobItemView from "./PrintJobItem";
import { getAllPrintOrders } from "../../managers/OfflineDataStore";
import type { PrintJobItem as PrintJobItemType } from "../../types/PrintJobItem";

const PrintJobs = () => {
  const [printJobItems, setPrintJobItems] = useState<PrintJobItemType[]>([]);

  useEffect(() => {
    (async () => {
      getAllPrintOrders().then((data) => {
        setPrintJobItems(data);
      });
    })();
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-gray-200 relative">
      <div className="absolute top-2 bottom-0 w-full overflow-y-auto p-2 pb-20 space-y-2 rounded-lg">
        {printJobItems.map((itm) => (
          <PrintJobItemView item={itm} key={itm.print_job_id} />
        ))}
      </div>
    </div>
  );
};

export default PrintJobs;
