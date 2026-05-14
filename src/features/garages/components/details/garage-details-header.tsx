import { Building, Building2, MapPin, X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { GarageDetails } from "../../types/garage.details";

type GarageDetailsHeaderProps = {
  garage: GarageDetails;
  onClose?: () => void;
};

export function GarageDetailsHeader({
  garage,
  onClose,
}: GarageDetailsHeaderProps) {
  return (
    <header className="relative pr-10">
      <div>
        <div className="flex items-start gap-4 md:items-center md:gap-6">
          <Building2
            size={34}
            className="shrink-0 text-zinc-900"
            strokeWidth={2.25}
            aria-hidden="true"
          />

          <h1 className="text-2xl font-bold leading-tight text-zinc-900 md:text-[30px] md:leading-none">
            {garage.name}
          </h1>
        </div>

        <p className="mt-4 text-[15px] leading-none text-zinc-500">
          Código: {garage.code} 
        </p>

        <div className="mt-8 space-y-4 text-[15px] leading-snug text-zinc-500 md:leading-none">
          <p className="flex items-start gap-3 md:items-center">
            <MapPin
              size={21}
              className="shrink-0 text-zinc-500"
              aria-hidden="true"
            />
            <span>{garage.address}</span>
          </p>

          <p className="flex items-start gap-3 md:items-center">
            <Building
              size={21}
              className="shrink-0 text-zinc-500"
              aria-hidden="true"
            />
            <span>
              Filial: {garage.branch} · Regional: {garage.regional}
            </span>
          </p>
        </div>
      </div>

      {onClose ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 text-zinc-900"
          onClick={onClose}
          aria-label="Fechar detalhes da garagem"
        >
          <X size={20} />
        </Button>
      ) : (
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 text-zinc-900"
        >
          <Link href="/garages" aria-label="Fechar detalhes da garagem">
            <X size={20} />
          </Link>
        </Button>
      )}
    </header>
  );
}
