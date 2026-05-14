import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Garage } from "../../types/garage";
import { GaragesEmptyState } from "./garages-empty-state";
import { GaragesTableRow } from "./garages-table-row";

type GaragesTableProps = {
    garages: Garage[];
    onViewGarage: (garage: Garage) => void;
};

export function GaragesTable({
    garages,
    onViewGarage,
}: GaragesTableProps) {
    const hasGarages = garages.length > 0;

    return (
        <div className="w-full">
            <Table className="block md:table">
                <TableHeader className="hidden md:table-header-group">
                    <TableRow className="border-b-[5px] border-zinc-300 hover:bg-zinc-50">
                        <TableHead className="w-[90px] text-xs font-medium text-zinc-500">
                            Código
                        </TableHead>

                        <TableHead className="min-w-[220px] text-xs font-medium text-zinc-500">
                            Nome
                        </TableHead>

                        <TableHead className="min-w-[280px] text-xs font-medium text-zinc-500">
                            Endereço
                        </TableHead>

                        <TableHead className="min-w-[150px] text-xs font-medium text-zinc-500">
                            Cidade/UF
                        </TableHead>

                        <TableHead className="w-[120px] text-xs font-medium text-zinc-500">
                            Regional
                        </TableHead>

                        <TableHead className="w-[80px] text-right text-xs font-medium text-zinc-500">
                            Ações
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody className="block md:table-row-group">
                    {hasGarages ? (
                        garages.map((garage) => (
                            <GaragesTableRow
                                key={garage.code}
                                garage={garage}
                                onViewGarage={onViewGarage}
                            />
                        ))
                    ) : (
                        <GaragesEmptyState />
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
