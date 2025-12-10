import PrintJobItem from "./PrintJobItem";

const PrintJobs = () => {
  return (
    <div className="flex flex-col flex-1 bg-gray-200 relative">
      <div className="absolute top-2 bottom-0 w-full overflow-y-auto p-2 pb-20 space-y-2 rounded-lg">
        <PrintJobItem />
        <PrintJobItem />
        <PrintJobItem />
      </div>
    </div>
  );
};

export default PrintJobs;
