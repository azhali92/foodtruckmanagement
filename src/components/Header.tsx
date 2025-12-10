export type Status = "ONLINE" | "BUSY" | "OFFLINE";

type HeaderPropsType = {
  status: Status;
};

const Header = ({ status }: HeaderPropsType): React.ReactNode => {
  return (
    <div className="bg-amber-50 px-2 py-3 border-2 border-amber-950 rounded-lg flex flex-row justify-between items-center">
      <div>Dashboard</div>
      <div className="flex flex-row items-center gap-2">
        <div>{"Status :"}</div>
        {status == "OFFLINE" && <div className="w-4 h-4 bg-red-600 rounded-2xl" />}
        {status == "BUSY" && <div className="w-4 h-4 bg-amber-500 rounded-2xl" />}
        {status == "ONLINE" && <div className="w-4 h-4 bg-green-600 rounded-2xl" />}
      </div>
    </div>
  );
};

export default Header;
