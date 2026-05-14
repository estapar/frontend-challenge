"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import {
  GaragePlan,
  GaragePlanFormValues,
} from "../../types/garage.details";

type GaragePlanModalMode = "create" | "edit";

type GaragePlanModalProps = {
  mode: GaragePlanModalMode;
  open: boolean;
  plan?: GaragePlan | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (plan: GaragePlanFormValues) => void;
};

const planFormSchema = z
  .object({
    description: z.string().trim().min(1, "Informe a descrição."),
    status: z.enum(["active", "inactive"]),
    vehicleType: z.string().min(1, "Selecione o tipo de veículo."),
    vacancies: z.number().int().min(1, "Informe ao menos uma vaga."),
    value: z.number().min(0, "Informe um valor válido."),
    cancellationValue: z
      .number()
      .min(0, "Informe um valor de cancelamento válido."),
    startsAt: z.string().min(1, "Informe o início da validade."),
    endsAt: z.string().min(1, "Informe o fim da validade."),
  })
  .refine((values) => values.endsAt >= values.startsAt, {
    message: "O fim deve ser posterior ao início.",
    path: ["endsAt"],
  });

type PlanFormValues = z.infer<typeof planFormSchema>;

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function getInitialFormValues(plan?: GaragePlan | null): PlanFormValues {
  if (!plan) {
    return {
      description: "",
      status: "active",
      vehicleType: "car",
      vacancies: 1,
      value: 0,
      cancellationValue: 0,
      startsAt: getTodayDate(),
      endsAt: "",
    };
  }

  return {
    description: plan.description,
    status: plan.status,
    vehicleType: "car",
    vacancies: plan.vacancies,
    value: plan.value,
    cancellationValue: 0,
    startsAt: getTodayDate(),
    endsAt: "",
  };
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs font-medium text-red-600">{message}</p>;
}

export function GaragePlanModal({
  mode,
  open,
  plan,
  loading = false,
  onClose,
  onSubmit,
}: GaragePlanModalProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<PlanFormValues>({
    resolver: zodResolver(planFormSchema),
    defaultValues: getInitialFormValues(plan),
  });

  const title = mode === "edit" ? "Editar Plano" : "Novo Plano";
  const description =
    mode === "edit"
      ? "Atualize os dados do plano selecionado."
      : "Preencha os dados para criar um novo plano.";
  const submitLabel = mode === "edit" ? "Salvar" : "Criar";

  useEffect(() => {
    if (open) {
      reset(getInitialFormValues(plan));
    }
  }, [open, plan, reset]);

  function submitForm(values: PlanFormValues) {
    const occupied = plan?.occupied ?? 0;

    onSubmit({
      id: plan?.id ?? crypto.randomUUID(),
      description: values.description,
      value: values.value,
      vacancies: values.vacancies,
      occupied,
      available: values.vacancies - occupied,
      status: values.status,
      vehicleType: values.vehicleType,
      cancellationValue: values.cancellationValue,
      startsAt: values.startsAt,
      endsAt: values.endsAt,
    });
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <form onSubmit={handleSubmit(submitForm)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-5 md:grid-cols-2">
            <div>
              <Input
                id="plan-description"
                label="Descrição"
                placeholder="Digite a descrição do plano"
                disabled={loading}
                error={errors.description?.message}
                {...register("description")}
              />
              <FieldError message={errors.description?.message} />
            </div>

            <div className="space-y-2">
              <span className="block text-sm font-semibold text-zinc-950">
                Status
              </span>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <label className="flex h-11 items-center gap-3">
                    <Switch
                      checked={field.value === "active"}
                      disabled={loading}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? "active" : "inactive")
                      }
                    />
                    <span className="text-sm font-semibold text-green-700">
                      {field.value === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </label>
                )}
              />
            </div>

            <div className="space-y-2">
              <span className="block text-sm font-semibold text-zinc-950">
                Tipo de Veículo
              </span>
              <Controller
                control={control}
                name="vehicleType"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Carro</SelectItem>
                      <SelectItem value="motorcycle">Moto</SelectItem>
                      <SelectItem value="truck">Caminhão</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError message={errors.vehicleType?.message} />
            </div>

            <div>
              <Input
                id="plan-vacancies"
                label="Total de Vagas"
                type="number"
                min={1}
                disabled={loading}
                error={errors.vacancies?.message}
                {...register("vacancies", { valueAsNumber: true })}
              />
              <FieldError message={errors.vacancies?.message} />
            </div>

            <div>
              <Input
                id="plan-value"
                label="Valor (R$)"
                type="number"
                min={0}
                step="0.01"
                disabled={loading}
                error={errors.value?.message}
                {...register("value", { valueAsNumber: true })}
              />
              <FieldError message={errors.value?.message} />
            </div>

            <div>
              <Input
                id="plan-cancellation-value"
                label="Valor do Cancelamento (R$)"
                type="number"
                min={0}
                step="0.01"
                disabled={loading}
                error={errors.cancellationValue?.message}
                {...register("cancellationValue", { valueAsNumber: true })}
              />
              <FieldError message={errors.cancellationValue?.message} />
            </div>

            <div>
              <Input
                id="plan-starts-at"
                label="Início da Validade"
                type="date"
                disabled={loading}
                error={errors.startsAt?.message}
                {...register("startsAt")}
              />
              <FieldError message={errors.startsAt?.message} />
            </div>

            <div>
              <Input
                id="plan-ends-at"
                label="Fim da Validade"
                type="date"
                disabled={loading}
                error={errors.endsAt?.message}
                {...register("endsAt")}
              />
              <FieldError message={errors.endsAt?.message} />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                size="lg"
                disabled={loading}
              >
                Cancelar
              </Button>
            </DialogClose>

            <Button
              type="submit"
              size="lg"
              loading={loading}
              className="bg-[#7ad33e] text-white hover:bg-[#6bc733]"
            >
              {submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
