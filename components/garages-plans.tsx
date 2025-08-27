"use client";
import { Car, Edit, DollarSign } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { AppButton } from "./app-button";
import { TbCoin } from "react-icons/tb";
import { PlanoDialog } from "./dialog-form";
import { useState } from "react";
import { PlansRoot } from "@/domain/plansList.entity";

interface PlansProps {
  plansIdData: PlansRoot;
}

export default function Planos({ plansIdData }: PlansProps) {
  const [openDialogForm, setOpenDialogForm] = useState(false);
  return (
    <>
      <div className="flex border rounded-lg overflow-hidden">
        <div className="w-48 border-r bg-gray-50 p-2 flex flex-col">
          <div className="flex items-center gap-2 px-3 mt-[-10px] w-[11.94rem] ml-[-9px] py-2 rounded-r-md bg-white border-l-4 border-l-green-500 font-medium text-sm">
            <TbCoin className="text-gray-500" size={20} />
            <span>Planos</span>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold">Planos Disponíveis</h2>
            <AppButton
              variant="secondary"
              className="text-green-600 border-green-500"
              onClick={() => setOpenDialogForm(true)}
            >
              + Novo Plano
            </AppButton>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="h-16">
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Vagas</TableHead>
                  <TableHead>Ocupadas</TableHead>
                  <TableHead>Disponíveis</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-gray-100 h-13">
                {plansIdData?.map((item, id) => {
                  return (
                    <TableRow key={id}>
                      <TableCell className="flex items-center gap-2 h-13">
                        <Car className="w-4 h-4 text-gray-500" />
                        {item.description}
                      </TableCell>

                      <TableCell>
                        {(item.priceInCents / 100).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>

                      <TableCell>{item.totalVacancies}</TableCell>

                      <TableCell>0</TableCell>

                      <TableCell>35</TableCell>

                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="text-gray-500 bg-gray-300"
                        >
                          Inativo
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit
                            className="w-4 h-4 text-gray-600"
                            onClick={() => setOpenDialogForm(true)}
                          />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      <PlanoDialog
        onOpenChange={() => setOpenDialogForm(false)}
        open={openDialogForm}
      />
    </>
  );
}
