const PrintJobItem: React.FC = () => {
  return (
    <div className=" bg-yellow-100 p-2 relative flex flex-col">
      <div className="font-bold">Print Job Id #</div>
      <div className="font-bold">Type : ORDER_RECEIPT</div>
      <div className="font-bold text-amber-600">Status : PENDING</div>

      <button className="font-bold absolute bottom-2 right-4 bg-gray-400 text-white px-2 py-1 rounded-lg">Retry</button>
    </div>
  );
};

export default PrintJobItem;
