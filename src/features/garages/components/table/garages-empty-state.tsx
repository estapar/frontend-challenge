import { TableCell, TableRow } from "@/components/ui/table";

export function GaragesEmptyState() {
    return (
        <TableRow className="block md:table-row">
            <TableCell
                colSpan={6}
                className="block h-32 text-center text-sm text-zinc-500 md:table-cell"
            >
                Nenhuma garagem encontrada.
            </TableCell>
        </TableRow>
    );
}
