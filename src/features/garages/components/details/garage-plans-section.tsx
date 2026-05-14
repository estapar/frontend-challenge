"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createPlan } from "@/src/services/plans.services";

import {
  CreatePlanRequest,
  GaragePlan,
  GaragePlanFormValues,
} from "../../types/garage.details";
import { GaragePlanModal } from "./garage-plan-modal";
import { GaragePlansTable } from "./garage-plans-table";

type GaragePlansSectionProps = {
  garageId: string;
  plans: GaragePlan[];
};

function toCents(value: number) {
  return String(Math.round(value * 100));
}

function mapPlanFormToRequest(
  garageId: string,
  plan: GaragePlanFormValues
): CreatePlanRequest {
  return {
    id: plan.id,
    garageId,
    description: plan.description,
    startValidity: plan.startsAt,
    endValidity: plan.endsAt,
    priceInCents: toCents(plan.value),
    active: String(plan.status === "active"),
    descriptionAvailable: plan.description,
    amountDailyCancellationInCents: toCents(plan.cancellationValue),
    vehicleType: plan.vehicleType,
    totalVacancies: plan.vacancies,
  };
}

function mapPlanFormToTablePlan(plan: GaragePlanFormValues): GaragePlan {
  return {
    id: plan.id,
    description: plan.description,
    value: plan.value,
    vacancies: plan.vacancies,
    occupied: plan.occupied,
    available: plan.available,
    status: plan.status,
  };
}

export function GaragePlansSection({
  garageId,
  plans,
}: GaragePlansSectionProps) {
  const queryClient = useQueryClient();
  const [localPlans, setLocalPlans] = useState(plans);
  const [selectedPlan, setSelectedPlan] = useState<GaragePlan | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const createPlanMutation = useMutation({
    mutationFn: (plan: GaragePlanFormValues) =>
      createPlan(mapPlanFormToRequest(garageId, plan)),
    onSuccess: (_, plan) => {
      setLocalPlans((currentPlans) => [
        ...currentPlans,
        mapPlanFormToTablePlan(plan),
      ]);
      queryClient.invalidateQueries({ queryKey: ["garage-plans", garageId] });
      handleCloseCreateModal();
    },
  });

  function handleCreatePlan() {
    setSelectedPlan(null);
    setIsCreateModalOpen(true);
  }

  function handleEditPlan(planId: string) {
    const plan = localPlans.find((currentPlan) => currentPlan.id === planId);

    if (!plan) {
      return;
    }

    setSelectedPlan(plan);
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
    setSelectedPlan(null);
  }

  function handleCloseCreateModal() {
    setIsCreateModalOpen(false);
  }

  function handleSubmitEditPlan(updatedPlan: GaragePlanFormValues) {
    const tablePlan = mapPlanFormToTablePlan(updatedPlan);

    setLocalPlans((currentPlans) =>
      currentPlans.map((currentPlan) =>
        currentPlan.id === tablePlan.id ? tablePlan : currentPlan
      )
    );
    handleCloseEditModal();
  }

  function handleSubmitCreatePlan(newPlan: GaragePlanFormValues) {
    createPlanMutation.mutate(newPlan);
  }

  return (
    <div className="min-w-0 flex-1 bg-white px-4 py-5 md:px-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-medium text-zinc-900">
          Planos Disponíveis
        </h2>

        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleCreatePlan}
          className="w-full border-green-500 px-3 text-green-600 hover:bg-green-50 hover:text-green-600 sm:w-auto"
        >
          <Plus size={16} />
          Novo Plano
        </Button>
      </div>

      {createPlanMutation.isError && (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
          Não foi possível criar o plano. Tente novamente.
        </p>
      )}

      <GaragePlansTable plans={localPlans} onEditPlan={handleEditPlan} />

      {isEditModalOpen && (
        <GaragePlanModal
          key={selectedPlan?.id}
          mode="edit"
          open={isEditModalOpen}
          plan={selectedPlan}
          onClose={handleCloseEditModal}
          onSubmit={handleSubmitEditPlan}
        />
      )}

      {isCreateModalOpen && (
        <GaragePlanModal
          key="create-plan"
          mode="create"
          open={isCreateModalOpen}
          loading={createPlanMutation.isPending}
          onClose={handleCloseCreateModal}
          onSubmit={handleSubmitCreatePlan}
        />
      )}
    </div>
  );
}
