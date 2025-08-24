import Image from "next/image";
import { LuBuilding2 } from "react-icons/lu";

export interface SideBarProps {
  onClickGarage: () => void;
  onClickLogo: () => void;
}

export function SideBar({ onClickGarage, onClickLogo }: SideBarProps) {
  return (
    <div className="flex flex-col w-[300px] h-screen border-r-2 border-(--sidebar-border) bg-(--sidebar-bg)">
      <button
        onClick={onClickLogo}
        className="w-auto h-auto hover:cursor-pointer p-4"
      >
        <Image
          src="/estapar-logo.png"
          alt="Logo Estapar"
          width={150}
          height={150}
        />
      </button>
      <hr className="border-(--sidebar-border)" />
      <ul>
        <button
          className="p-4 w-full block hover:bg-gray-100 hover:cursor-pointer text-lg"
          onClick={onClickGarage}
        >
          <li className="flex flex-row items-start">
            <LuBuilding2 className="h-6 w-6 inline-block mr-4" />
            <h1>Garagens</h1>
          </li>
        </button>
      </ul>
    </div>
  );
}
