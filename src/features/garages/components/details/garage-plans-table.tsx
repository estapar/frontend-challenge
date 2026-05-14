import { Car, SquarePen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { GaragePlan } from "../../types/garage.details";

type GaragePlansTableProps = {
  plans: GaragePlan[];
  onEditPlan: (planId: string) => void;
};

const statusLabel = {
  active: "Ativo",
  inactive: "Inativo",
};

const statusBadgeVariant = {
  active: "success",
  inactive: "warning",
} as const;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatNumber(value: number | undefined) {
  return value ?? "-";
}

export function GaragePlansTable({
  plans,
  onEditPlan,
}: GaragePlansTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200">
      <Table className="min-w-[760px]">
        <TableHeader className="bg-white">
          <TableRow className="border-b border-zinc-200 text-zinc-800 hover:bg-white">
            <TableHead className="px-4 py-3 font-semibold text-zinc-800">
              Descrição
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold text-zinc-800">
              Valor
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold text-zinc-800">
              Vagas
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold text-zinc-800">
              Ocupadas
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold text-zinc-800">
              Disponíveis
            </TableHead>
            <TableHead className="px-4 py-3 font-semibold text-zinc-800">
              Status
            </TableHead>
            <TableHead className="px-4 py-3 text-center font-semibold text-zinc-800">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {plans.map((plan) => (
            <TableRow
              key={plan.id}
              className="border-b border-zinc-100 bg-zinc-50 text-zinc-500 last:border-b-0 hover:bg-zinc-50"
            >
              <TableCell className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Car size={16} className="text-zinc-400" />
                  <span>{plan.description}</span>
                </div>
              </TableCell>

              <TableCell className="px-4 py-3">
                {formatCurrency(plan.value)}
              </TableCell>
              <TableCell className="px-4 py-3">{plan.vacancies}</TableCell>
              <TableCell className="px-4 py-3">
                {formatNumber(plan.occupied)}
              </TableCell>
              <TableCell className="px-4 py-3">
                {formatNumber(plan.available)}
              </TableCell>

              <TableCell className="px-4 py-3">
                <Badge variant={statusBadgeVariant[plan.status]}>
                  {statusLabel[plan.status]}
                </Badge>
              </TableCell>

              <TableCell className="px-4 py-3">
                <div className="flex justify-center">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="text-zinc-700 hover:bg-zinc-200"
                    onClick={() => onEditPlan(plan.id)}
                    aria-label={`Editar plano ${plan.description}`}
                  >
                    <SquarePen size={17} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
