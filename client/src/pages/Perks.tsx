import {
  CctvIcon,
  DoorOpenIcon,
  ParkingCircleIcon,
  PawPrintIcon,
  TvIcon,
  WifiIcon,
} from "lucide-react";

type Props = {
  selectedPerks: any;
  onChange: (e: any) => void;
};

function Perks({ selectedPerks, onChange }: Props) {
  function handleItemClick(name: string) {
    console.log(selectedPerks);
    if (selectedPerks.includes(name)) {
      onChange([
        ...selectedPerks.filter((selectedName: any) => selectedName !== name),
      ]);
    } else {
      onChange([...selectedPerks, name]);
    }
  }

  return (
    <>
      <div
        onClick={() => handleItemClick("wifi")}
        className={`border flex items-center space-x-2 md:space-x-3 p-3 md:p-4 rounded-xl cursor-pointer ${
          selectedPerks.includes("wifi")
            ? "bg-[#D70566] text-white"
            : "bg-gray-100 text-gray-500"
        } `}
      >
        <WifiIcon />
        <span>WiFi</span>
      </div>

      <div
        onClick={() => handleItemClick("parking")}
        className={`border flex items-center space-x-2 md:space-x-3 p-3 md:p-4 rounded-xl cursor-pointer ${
          selectedPerks.includes("parking")
            ? "bg-[#D70566] text-white"
            : "bg-gray-100 text-gray-500"
        } `}
      >
        <ParkingCircleIcon />
        <span>Free parking</span>
      </div>

      <div
        onClick={() => handleItemClick("tv")}
        className={`border flex items-center space-x-2 md:space-x-3 p-3 md:p-4 rounded-xl cursor-pointer ${
          selectedPerks.includes("tv")
            ? "bg-[#D70566] text-white"
            : "bg-gray-100 text-gray-500"
        } `}
      >
        <TvIcon />
        <span>TV</span>
      </div>

      <div
        onClick={() => handleItemClick("pets")}
        className={`border flex items-center space-x-2 md:space-x-3 p-3 md:p-4 rounded-xl cursor-pointer ${
          selectedPerks.includes("pets")
            ? "bg-[#D70566] text-white"
            : "bg-gray-100 text-gray-500"
        } `}
      >
        <PawPrintIcon />
        <span>Pets allowed</span>
      </div>

      <div
        onClick={() => handleItemClick("entrance")}
        className={`border flex items-center space-x-2 md:space-x-3 p-3 md:p-4 rounded-xl cursor-pointer ${
          selectedPerks.includes("entrance")
            ? "bg-[#D70566] text-white"
            : "bg-gray-100 text-gray-500"
        } `}
      >
        <DoorOpenIcon />
        <span>Private entrance</span>
      </div>

      <div
        onClick={() => handleItemClick("cctv")}
        className={`border flex items-center space-x-2 md:space-x-3 p-3 md:p-4 rounded-xl cursor-pointer ${
          selectedPerks.includes("cctv")
            ? "bg-[#D70566] text-white"
            : "bg-gray-100 text-gray-500"
        } `}
      >
        <CctvIcon />
        <span>CCTV surveillance</span>
      </div>
    </>
  );
}

export default Perks;
