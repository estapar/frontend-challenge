import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LuEye } from "react-icons/lu";
import { GarageDetailsSheet } from "./garagesDetail";
import { Daum } from "@/domain/garageList.entity";
interface GaragesProps {
  garageData: Daum[];
}

export function GaragesTable({ garageData }: GaragesProps) {
  return (
    <div className=" rounded-md border text-2xl">
      <Table>
        <TableHeader>
          <TableRow className="h-[3rem]">
            <TableHead className="w-[100px] text-gray-600 ">Código</TableHead>
            <TableHead className="text-gray-600">Nome</TableHead>
            <TableHead className="text-gray-600">Endereço</TableHead>
            <TableHead className="text-gray-600">Cidade/UF</TableHead>
            <TableHead className="text-gray-600">Regional</TableHead>
            <TableHead className="text-center w-[80px] text-gray-600">
              Ações
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="h-[30rem]">
          {garageData.map((g, id) => (
            <TableRow key={id} className="">
              <TableCell className="font-medium text-md">{g.code}</TableCell>
              <TableCell>{g.name}</TableCell>
              <TableCell>{g.address}</TableCell>
              <TableCell>
                {g.city}/{g.state}
              </TableCell>
              <TableCell>{g.region}</TableCell>
              <TableCell className="text-center">
                <GarageDetailsSheet idGarage={g.code}>
                  <button className="text-gray-500 hover:text-gray-800">
                    <LuEye className="w-5 h-5 cursor-pointer" />
                  </button>
                </GarageDetailsSheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
