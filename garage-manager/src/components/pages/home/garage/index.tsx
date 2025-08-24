import { LuBuilding2 } from "react-icons/lu";

import { GarageTable } from "@components/layout/GarageTable";

export function GarageContent() {
  return (
    <div className="w-full pr-6 bg-white space-y-4">
      <div>
        <div className="flex flex-row items-start mb-2">
          <LuBuilding2 className="h-8 w-8 inline-block mr-4 text-(--estapar-green)" />
          <h1 className="text-2xl font-semibold text-(--text-title)">
            Garagens
          </h1>
        </div>
        <p className="text-base">
          Visualize as garagens habilitadas para mensalistas digitais.
        </p>
      </div>
      <GarageTable />
    </div>
  );
}
