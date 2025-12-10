const OrderItem: React.FC = () => {
  return (
    <div className=" bg-yellow-100 p-2 relative flex flex-col">
      <div className="font-bold">Order #</div>
      <div className="font-bold">Item #1</div>
      <div className="font-bold">Item #2</div>
      <div className="font-bold text-amber-600">Status : PENDING</div>

      <button className="font-bold absolute bottom-2 right-4 bg-red-800 text-white px-2 py-1 rounded-lg">
        Cancel Order
      </button>
    </div>
  );
};

export default OrderItem;
