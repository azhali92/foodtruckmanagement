import { createPrintJob } from "../../managers/OfflineDataStore";
import type { OrderItem } from "../../types/OrdersItem";

type OrderItemPropTypes = {
  item: OrderItem;
  onDelete: (order_id: string) => void;
};

const OrderItemView: React.FC<OrderItemPropTypes> = ({ item, onDelete }) => {
  const onClickPrintReceipt = async () => {
    createPrintJob(item);
  };

  return (
    <div className=" bg-yellow-100 p-2 relative flex flex-col">
      <div className="font-bold text-sm">{`Order # ${item.order_id}`}</div>

      {item.items.map((orderitm) => (
        <div key={orderitm.item.item_id} className="font-bold">
          {orderitm.item.name}
        </div>
      ))}
      <div className="font-bold text-amber-600">Status : PENDING</div>

      <div className="absolute bottom-2 right-4 flex flex-col gap-2">
        <button onClick={onClickPrintReceipt} className="font-bold  bg-blue-800 text-white px-2 py-1 rounded-lg">
          Print Receipt
        </button>
        <button
          onClick={() => onDelete(item.order_id)}
          className="font-bold  bg-red-800 text-white px-2 py-1 rounded-lg"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default OrderItemView;
