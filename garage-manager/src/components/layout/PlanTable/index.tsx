import { useEffect, useState } from "react";
import { PlanItem, getPlans } from "@services/plans";
import { FaEdit } from "react-icons/fa";

export interface CreatePlanModalProps {
  onActionClick: (plan: PlanItem) => void;
}

export function PlanTable({ onActionClick }: CreatePlanModalProps) {
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState<PlanItem[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true);
      const { data, error } = await getPlans({});

      if (!error) {
        console.log("Plans data:", data);
        setPlans(data || []);
      } else {
        console.error("Error fetching plans:", error);
      }

      setLoading(false);
    };

    fetchPlans();
  }, []);

  return (
    <div className="border-2 border-gray-300 border-collapse rounded-md pb-1">
      <table className="table-auto w-full text-left ">
        <thead>
          <tr className="border-b-2 border-gray-300">
            <th className="p-2">Descrição</th>
            <th className="p-2">Valor</th>
            <th className="p-2">Vagas</th>
            <th className="p-2">Ocupadas</th>
            <th className="p-2">Disponíveis</th>
            <th className="p-2">Status</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {!loading ? (
            <>
              {plans.map((plan, index) => (
                <tr
                  key={index}
                  className="border-b-2 border-gray-300 text-black"
                >
                  <td className="p-2">{plan.description}</td>
                  <td className="p-2">{plan.priceInCents}</td>
                  <td className="p-2">{plan.totalVacancies}</td>
                  <td className="p-2"> 0 </td>
                  <td className="p-2">{plan.totalVacancies - 0}</td>
                  <td className="p-2">{plan.active ? "ativo" : "inativo"}</td>
                  <td className="p-2" onClick={() => onActionClick(plan)}>
                    <div className="w-fit hover:cursor-pointer hover:text-black text-(--foreground)">
                      <FaEdit className="w-5 h-5" />
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr>
              <td className="p-2">Carregando...</td>
              <td className="p-2">Carregando...</td>
              <td className="p-2">Carregando...</td>
              <td className="p-2">Carregando...</td>
              <td className="p-2">Carregando...</td>
              <td className="p-2">Carregando...</td>
              <td className="p-2">Carregando...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
