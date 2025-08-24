"use client";

import { useState } from "react";
import Modal from "@mui/material/Modal";
import { LuBuilding } from "react-icons/lu";
import { LuBuilding2 } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { GarageItemExtended } from "@/services/garages";
import { PlanTable } from "@components/layout/PlanTable";
import { CreatePlanModal } from "../CreatePlanModal";
import { PlanItem } from "@services/plans";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export interface GarageInfoModalProps {
  garage?: GarageItemExtended;
  isOpen: boolean;
  onClose: () => void;
}

export function GarageInfoModal({
  garage,
  isOpen,
  onClose,
}: GarageInfoModalProps) {
  const [isCreatePlanModalOpen, setCreatePlanModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanItem | undefined>(
    undefined
  );

  const onActionClick = (plan: PlanItem) => {
    setSelectedPlan(plan);
    setCreatePlanModalOpen(true);
  };

  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 bg-white border border-gray-300 rounded-lg shadow-lg p-6 focus:outline-none">
          <div className="space-y-4">
            <div>
              <div className="flex flex-row text-black">
                <LuBuilding2 className="h-6 w-6 inline-block mr-2" />
                <h1 className="text-lg font-semibold">
                  {garage?.name.toUpperCase()}
                </h1>
              </div>
              <h2 className="text-sm font-medium text-gray-500">
                Código: {garage?.code}
              </h2>
            </div>
            <div className="flex flex-row">
              <CiLocationOn className="h-6 w-6 inline-block mr-2" />
              <div>{garage?.address}</div>
            </div>
            <div className="flex flex-row">
              <LuBuilding className="h-6 w-6 inline-block mr-2" />
              <div>
                {"Filial: " +
                  garage?.subsidiary.toUpperCase() +
                  " - " +
                  garage?.state +
                  " - Regional: " +
                  garage?.region}
              </div>
            </div>
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col p-4 w-8/25 border border-gray-300 rounded-md shadow-sm">
                <span>Total de Vagas: </span>
                <div className="flex flex-row items-center mt-2">
                  <MdOutlinePeopleAlt className="w-5 h-5 inline-block mr-2" />
                  <div className="text-1xl text-black font-semibold">
                    {garage ? garage.countSpaces : 0}
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4 w-8/25 border border-gray-300 rounded-md shadow-sm">
                <span>Ocupadas: </span>
                <div className="flex flex-row items-center mt-2">
                  <MdOutlinePeopleAlt className="w-5 h-5 inline-block mr-2 text-orange-400" />
                  <div className="text-1xl text-black font-semibold">
                    {garage ? garage.occupiedSpaces : 0}
                  </div>
                </div>
              </div>
              <div className="flex flex-col p-4 w-8/25 border border-gray-300 rounded-md shadow-sm">
                <span>Disponíveis: </span>
                <div className="flex flex-row items-center mt-2">
                  <MdOutlinePeopleAlt className="w-5 h-5 inline-block mr-2 text-(--estapar-green)" />
                  <div className="text-1xl text-black font-semibold">
                    {garage ? garage.countSpaces - garage.occupiedSpaces : 0}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center">
                <RiMoneyDollarCircleLine className="h-6 w-6 inline-block mr-2" />
                <h1 className="text-lg font-semibold">Planos Disponíveis</h1>
              </div>
              <button
                onClick={() => {
                  setSelectedPlan(undefined);
                  setCreatePlanModalOpen(true);
                }}
                disabled={!garage?.code}
                className="border-2 border-(--estapar-green) rounded-md px-4 py-2 hover:bg-gray-100 hover:cursor-pointer text-(--estapar-green) font-semibold disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:ring-2 disabled:ring-gray-200"
              >
                <div className="flex items-center">
                  <FaPlus className="w-4 h-4 inline-block mr-4" />
                  Novo Plano
                </div>
              </button>
            </div>
            <PlanTable onActionClick={onActionClick} />
          </div>
          <CreatePlanModal
            garageId={garage?.code}
            plan={selectedPlan}
            isOpen={isCreatePlanModalOpen}
            onClose={() => {
              setSelectedPlan(undefined);
              setCreatePlanModalOpen(false);
            }}
          />
        </div>
      </Modal>
    </div>
  );
}
