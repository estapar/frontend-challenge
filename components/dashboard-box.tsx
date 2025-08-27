import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { IoMdArrowRoundForward } from "react-icons/io";

type BoxCardProps = {
  icon: IconType;
  title: string;
  description: string;
  link: string;
};

export const DashBoardBoxCard = ({
  icon: Icon,
  title,
  description,
  link,
}: BoxCardProps) => {
  return (
    <Link
      href={link}
      className="flex justify-between  rounded-xl border border-gray-200 p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02] hover:shadow-md"
    >
      <div className="flex flex-col gap-3">
        <div className="  text-[#7AD33E]">
          <Icon size={30} />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <p className="text-md text-gray-500">{description}</p>
        </div>
      </div>

      <IoMdArrowRoundForward className="text-gray-300" />
    </Link>
  );
};
