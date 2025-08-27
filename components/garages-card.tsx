import { Users } from "lucide-react";

interface GaragesCardProps {
  colorIcon: string;
  title: string;
  value: number;
}

export const GaragesCard = ({ colorIcon, title, value }: GaragesCardProps) => {
  return (
    <div className="border rounded-lg p-4 h-[8rem] flex flex-col gap-1 bg-white shadow-sm">
      <span className="text-sm text-gray-500 font-medium">{title}</span>
      <div className="flex items-center gap-2">
        <Users className={`w-5 h-5 ${colorIcon}`} />
        <span className="text-2xl font-bold">{value}</span>
      </div>
    </div>
  );
};
