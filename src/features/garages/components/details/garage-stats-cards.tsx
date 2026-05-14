import { Users } from "lucide-react";

import { Card } from "@/components/ui/card";

import { GarageDetails } from "../../types/garage.details";

type GarageStatsCardsProps = {
  garage: GarageDetails;
};

const statsCards = [
  {
    label: "Total de Vagas",
    valueKey: "totalVacancies",
    iconClassName: "text-zinc-500",
  },
  {
    label: "Ocupadas",
    valueKey: "occupiedVacancies",
    iconClassName: "text-orange-500",
  },
  {
    label: "Disponíveis",
    valueKey: "availableVacancies",
    iconClassName: "text-green-500",
  },
] as const;

export function GarageStatsCards({ garage }: GarageStatsCardsProps) {
  return (
    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
      {statsCards.map((card) => (
        <Card
          key={card.label}
          className="min-h-[96px] rounded-lg px-6 py-5"
        >
          <p className="text-sm font-medium text-zinc-500">{card.label}</p>

          <div className="mt-3 flex items-center gap-2">
            <Users
              size={18}
              className={card.iconClassName}
              aria-hidden="true"
            />

            <strong className="text-2xl font-semibold leading-none text-zinc-900">
              {garage[card.valueKey]}
            </strong>
          </div>
        </Card>
      ))}
    </div>
  );
}
