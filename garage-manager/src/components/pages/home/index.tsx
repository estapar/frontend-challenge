"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoPerson } from "react-icons/io5";
import { IoIosExit } from "react-icons/io";
import { removeToken } from "@utils/handleToken";
import { SideBar } from "@layout/SideBar";
import { WelcomeContent } from "./welcome";
import { GarageContent } from "./garage";

export function HomePage() {
  const router = useRouter();
  const [currentSection, setCurrentSection] = useState("welcome");
  const onExit = () => {
    removeToken();
    router.push("/login");
  };

  const onClickLogo = () => {
    setCurrentSection("welcome");
  };

  const onClickGarage = () => {
    setCurrentSection("garage");
  };

  return (
    <div className="flex max-h-screen">
      <SideBar onClickLogo={onClickLogo} onClickGarage={onClickGarage} />
      <div className="flex flex-col bg-white w-full">
        <div className="flex flex-row p-4 pt-8 justify-end">
          <div className="flex flex-row">
            <IoPerson className="h-5 w-5 inline-block mr-2" />
            <h1 className="mr-4">Roberto Freitas</h1>
          </div>
          <button
            className="flex flex-row block hover:cursor-pointer hover:text-black"
            onClick={onExit}
          >
            <IoIosExit className="h-6 w-6 inline-block mr-2" />
            <h1>Sair</h1>
          </button>
        </div>
        <div className="h-screen pt-6 pl-12">
          {currentSection === "welcome" && (
            <WelcomeContent onClickGarage={onClickGarage} />
          )}
          {currentSection === "garage" && <GarageContent />}
        </div>
      </div>
    </div>
  );
}
