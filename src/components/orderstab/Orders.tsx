import { useEffect, useState } from "react";
import OrderItemView from "./OrderItem";
import type { OrderItem as OrderItemType } from "../../types/OrdersItem";
import { deleteOrder, getAllOrders } from "../../managers/OfflineDataStore";
const Orders = () => {
  const [orderItems, setOrderItems] = useState<OrderItemType[]>([]);

  useEffect(() => {
    (async () => {
      getAllOrders().then((data) => {
        setOrderItems(data);
      });
    })();
  }, []);

  const onDeleteOrder = async (order_id: string) => {
    await deleteOrder(order_id);
    getAllOrders().then((data) => {
      setOrderItems(data);
    });
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-200 relative">
      <div className="absolute top-2 bottom-0 w-full overflow-y-auto p-2 pb-20 space-y-2 rounded-lg">
        {orderItems.map((itm) => (
          <OrderItemView key={itm.order_id} item={itm} onDelete={onDeleteOrder} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
