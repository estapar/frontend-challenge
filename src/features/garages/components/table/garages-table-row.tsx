"use client";

import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Garage } from "../../types/garage";

type GaragesTableRowProps = {
    garage: Garage;
    onViewGarage: (garage: Garage) => void;
};

export function GaragesTableRow({
    garage,
    onViewGarage,
}: GaragesTableRowProps) {
    function handleViewGarage() {
        onViewGarage(garage);
    }

    return (
        <TableRow className="mb-3 block rounded-md border border-zinc-200 bg-white p-4 last:mb-0 md:table-row md:rounded-none md:border-x-0 md:border-t-0 md:p-0">
            <TableCell className="flex justify-between gap-4 whitespace-normal px-0 py-2 text-xs text-zinc-700 md:table-cell md:px-2 md:py-2">
                <span className="font-medium text-zinc-500 md:hidden">
                    Código
                </span>
                <span className="text-right md:text-left">{garage.code}</span>
            </TableCell>

            <TableCell className="flex justify-between gap-4 whitespace-normal px-0 py-2 text-xs font-medium text-zinc-800 md:table-cell md:px-2 md:py-2">
                <span className="font-medium text-zinc-500 md:hidden">
                    Nome
                </span>
                <span className="text-right md:text-left">{garage.name}</span>
            </TableCell>

            <TableCell className="flex justify-between gap-4 whitespace-normal px-0 py-2 text-xs text-zinc-700 md:table-cell md:px-2 md:py-2">
                <span className="font-medium text-zinc-500 md:hidden">
                    Endereço
                </span>
                <span className="text-right md:text-left">
                    {garage.address}
                </span>
            </TableCell>

            <TableCell className="flex justify-between gap-4 whitespace-normal px-0 py-2 text-xs text-zinc-700 md:table-cell md:px-2 md:py-2">
                <span className="font-medium text-zinc-500 md:hidden">
                    Cidade/UF
                </span>
                <span className="text-right md:text-left">
                    {garage.cityUf}
                </span>
            </TableCell>

            <TableCell className="flex justify-between gap-4 whitespace-normal px-0 py-2 text-xs text-zinc-700 md:table-cell md:px-2 md:py-2">
                <span className="font-medium text-zinc-500 md:hidden">
                    Regional
                </span>
                <span className="text-right md:text-left">
                    {garage.regional}
                </span>
            </TableCell>

            <TableCell className="flex justify-end px-0 pt-3 md:table-cell md:px-2 md:py-2 md:text-right">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-700 hover:bg-zinc-100"
                    onClick={handleViewGarage}
                    aria-label={`Visualizar detalhes de ${garage.name}`}
                >
                    <Eye size={16} />
                </Button>
            </TableCell>
        </TableRow>
    );
}
