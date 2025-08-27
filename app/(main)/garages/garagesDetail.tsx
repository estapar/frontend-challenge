import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { LuMapPin, LuBuilding } from "react-icons/lu";
import { GaragesCard } from "@/components/garages-card";
import Image from "next/image";
import Planos from "@/components/garages-plans";
import { ApiClient } from "@/infra/http/apiClient";
import { GarageIdListApiRepostiroy } from "@/infra/http/getGarageIdList.repository";
import { GetGarageListIdUseCase } from "@/application/getGarageIdlList.usecase";
import { GarageIdList } from "@/domain/garageIdList.entity";
import { PlansIdListApiRepostiroy } from "@/infra/http/getPlansId.repository";
import { GetPlansListIdUseCase } from "@/application/getPlansIdList.usecase";
import { PlansRoot } from "@/domain/plansList.entity";

interface GarageDetailsSheetProps {
  children: ReactNode;
  idGarage: string;
}

const apiClient = new ApiClient();

const garageIdRepository = new GarageIdListApiRepostiroy(apiClient);
const plansIdRepository = new PlansIdListApiRepostiroy(apiClient);

const getGarageId = new GetGarageListIdUseCase(garageIdRepository);
const getPlans = new GetPlansListIdUseCase(plansIdRepository);

export function GarageDetailsSheet({
  children,
  idGarage,
}: GarageDetailsSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [garageIdData, setGarageIdData] = useState({} as GarageIdList);
  const [plansIdData, setPlansIdData] = useState<PlansRoot>([]);
  const [loading, setLoading] = useState(false);

  const fetchGarageIdList = useCallback(async () => {
    try {
      setLoading(true);
      const [data, dataPlans] = await Promise.all([
        getGarageId.execute(idGarage),
        getPlans.execute(idGarage),
      ]);

      setGarageIdData(data);
      setPlansIdData(dataPlans);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [idGarage]);

  useEffect(() => {
    if (isOpen) {
      fetchGarageIdList();
    }
  }, [isOpen, fetchGarageIdList]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="h-screen max-h-full bg-white w-full max-w-3xl overflow-y-auto p-2 sm:max-w-xl md:max-w-[80%]">
        {loading ? (
          <div className="flex items-center justify-center h-full w-full">
            <SheetTitle> </SheetTitle>
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent" />
          </div>
        ) : (
          <>
            <SheetHeader className="space-y-4">
              <div className="space-y-2">
                <SheetTitle className="text-2xl font-bold flex items-center gap-2 uppercase">
                  <LuBuilding className="w-5 h-5" />
                  {garageIdData?.name}
                </SheetTitle>
                <SheetDescription className="text-sm text-gray-600">
                  Código: {garageIdData.code}
                </SheetDescription>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <LuMapPin className="w-4 h-4" />
                  <span className="uppercase">{garageIdData.address}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <LuBuilding className="w-4 h-4" />
                  <span className="uppercase">
                    Filial: {garageIdData.subsidiary} • Regional:{" "}
                    {garageIdData.region}
                  </span>
                </div>
              </div>
            </SheetHeader>

            <div className="w-full bg-gray-50 h-[2.94rem] rounded-md">
              <div className="inline-block bg-white ml-2 mt-1 rounded-t-sm px-4 py-2 border-b-2 border-green-500">
                <span className="text-sm font-semibold text-black">
                  Mensalista Digital
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full">
              <div className="flex-1 grid grid-cols-3 gap-4">
                <GaragesCard
                  title="Total de Vagas"
                  value={garageIdData.countSpaces}
                  colorIcon="text-gray-500"
                />

                <GaragesCard
                  title="Ocupadas"
                  value={garageIdData.occupiedSpaces}
                  colorIcon="text-orange-500"
                />

                <GaragesCard
                  title="Disponíveis"
                  value={garageIdData.maxDiscountPercent}
                  colorIcon="text-green-500"
                />
              </div>

              <div>
                <Image
                  src="/qrcode.png"
                  alt="QR Code"
                  width={130}
                  height={160}
                />
              </div>
            </div>

            <Planos plansIdData={plansIdData} />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
