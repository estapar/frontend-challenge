"use client";

import { useState, useEffect } from "react";
import { createPlan } from "@services/plans";
import { v4 as uuid } from "uuid";
import Modal from "@mui/material/Modal";
import { PlanItem } from "@services/plans";

export interface CreatePlanModalProps {
  garageId?: string;
  isOpen: boolean;
  onClose: () => void;
  plan?: PlanItem;
}

export function CreatePlanModal({
  garageId,
  plan,
  isOpen,
  onClose,
}: CreatePlanModalProps) {
  const [newPlan, setNewPlan] = useState<PlanItem>({
    idPlan: uuid(),
    garageId: garageId || "",
    description: "",
    startValidity: new Date().toISOString(),
    endValidity: new Date().toISOString(),
    priceInCents: 0,
    active: false,
    vehicleType: "",
    descriptionAvailable: "",
    amountDailyCancellationInCents: 0,
    totalVacancies: 0,
  });

  useEffect(() => {
    if (garageId) {
      setNewPlan((prevState) => ({ ...prevState, garageId }));
    }
  }, [garageId]);

  useEffect(() => {
    if (plan) {
      setNewPlan(plan);
    }
  }, [plan]);

  const onSubmit = async () => {
    createPlan(newPlan);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === "priceInCents" || name === "amountDailyCancellationInCents") {
      setNewPlan((prevState) => ({
        ...prevState,
        [name]: parseInt(value) * 100,
      }));
    } else {
      setNewPlan((prevState) => ({
        ...prevState,
        [name]: name === "active" ? !prevState.active : value,
      }));
    }
  };

  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-fit bg-white border border-gray-300 rounded-lg shadow-lg p-6 focus:outline-none">
          <div className="space-y-4">
            <div>
              <h1 className="text-lg font-semibold text-black">Novo Plano</h1>
              <h2 className="text-sm font-medium">
                Preencha as informações abaixo para criar um novo plano.
              </h2>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-row space-x-4">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-semibold text-black ">
                      Descrição
                    </label>
                    <input
                      onChange={handleChange}
                      name="description"
                      type="text"
                      value={newPlan.description}
                      className="min-w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-(--estapar-green)"
                      placeholder="Descrição do plano"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-semibold text-black ">
                      Tipo de Veículo
                    </label>
                    <input
                      onChange={handleChange}
                      name="vehicleType"
                      type="string"
                      value={newPlan.vehicleType}
                      className="min-w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-(--estapar-green)"
                      placeholder="Tipo de veículo"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-semibold text-black ">
                      Valor (R$)
                    </label>
                    <input
                      onChange={handleChange}
                      name="priceInCents"
                      type="number"
                      value={newPlan.priceInCents / 100}
                      className="min-w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-(--estapar-green)"
                      placeholder="Valor do plano"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-semibold text-black ">
                      Início da Validade
                    </label>
                    <input
                      onChange={handleChange}
                      name="startValidity"
                      type="date"
                      className="min-w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-(--estapar-green)"
                      placeholder="Início da validade"
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-semibold text-black ">
                      Status
                    </label>
                    <input
                      onChange={handleChange}
                      name="active"
                      type="checkbox"
                      checked={newPlan.active}
                      className="h-[42px] w-10 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-(--estapar-green)"
                      placeholder="Status do plano"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-semib old text-black ">
                      Total de Vagas
                    </label>
                    <input
                      onChange={handleChange}
                      name="totalVacancies"
                      type="number"
                      value={newPlan.totalVacancies}
                      className="min-w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-(--estapar-green)"
                      placeholder="Total de vagas"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-semibold text-black ">
                      Valor do Cancelamento (R$)
                    </label>
                    <input
                      onChange={handleChange}
                      name="amountDailyCancellationInCents"
                      type="number"
                      value={newPlan.amountDailyCancellationInCents / 100}
                      className="min-w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-(--estapar-green)"
                      placeholder="Valor do cancelamento"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-semibold text-black ">
                      Fim da Validade
                    </label>
                    <input
                      onChange={handleChange}
                      type="date"
                      name="endValidity"
                      className="min-w-64 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-(--estapar-green)"
                      placeholder="Fim da"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 hover:cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    onSubmit();
                    onClose();
                  }}
                  className="px-4 py-2 bg-(--estapar-green) text-white rounded-md hover:bg-green-600 hover:cursor-pointer"
                >
                  Salvar Plano
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
