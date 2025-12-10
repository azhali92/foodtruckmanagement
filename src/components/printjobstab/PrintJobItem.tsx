import type { PrintJobItem } from "../../types/PrintJobItem";

type PrintJobItemPropType = {
  item: PrintJobItem;
};

const PrintJobItemView: React.FC<PrintJobItemPropType> = ({ item }) => {
  return (
    <div className=" bg-yellow-100 p-2 relative flex flex-col">
      <div className="font-bold text-sm">{`Print Job Id # ${item.print_job_id}`}</div>
      <div className="font-bold">Type : ORDER_RECEIPT</div>
      <div className="font-bold text-amber-600">Status : PENDING</div>

      <button className="font-bold absolute bottom-2 right-4 bg-gray-400 text-white px-2 py-1 rounded-lg">Retry</button>
    </div>
  );
};

export default PrintJobItemView;
