"use client";
import { AppInput } from "@/components/app-Input";
import { Switch } from "@/components/ui/switch";
import { useCallback, useEffect, useState } from "react";
import { LuBuilding2, LuSearch } from "react-icons/lu";
import { GaragesTable } from "./garagesTable";
import { ApiClient } from "@/infra/http/apiClient";
import { GaragePaginatedListApiRepostiroy } from "@/infra/http/getGaragePaginetedList.repository";
import { GetGarageListUseCase } from "@/application/getGarageList.usecase";
import { Daum } from "@/domain/garageList.entity";

const apiClient = new ApiClient();
const garageListRepository = new GaragePaginatedListApiRepostiroy(apiClient);
const getGarageUsecase = new GetGarageListUseCase(garageListRepository);

export default function GaragesDashBoard() {
  const [garageData, setGarageData] = useState<Daum[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchGarageList = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getGarageUsecase.execute();
      setGarageData(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGarageList();
  }, [fetchGarageList]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 min-h-screen w-full bg-white">
      <div className="flex flex-col gap-10 ml-[2rem]">
        <div className="flex flex-col gap-2 items-start space-x-2">
          <div className="flex items-center gap-2">
            <LuBuilding2 size={30} className="text-[#7AD33E]" />
            <h1 className="text-2xl font-bold text-gray-800">Garagens</h1>
          </div>
          <div>
            <p className="text-lg text-gray-500">
              Visualize as garagens habilitadas para mensalistas digitais.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Switch
              id="mensalista"
              defaultChecked
              className="data-[state=checked]:bg-green-500"
            />
            <h4 className="text-sm font-medium leading-none">
              Mensalista Digital
            </h4>
          </div>

          <span className="text-gray-600 text-sm">
            {garageData.length} registros
          </span>

          <div className="w-64">
            <AppInput
              placeholder="Buscar por nome"
              icon={<LuSearch size={20} />}
            />
          </div>
        </div>

        <GaragesTable garageData={garageData} />
      </div>
    </div>
  );
}
