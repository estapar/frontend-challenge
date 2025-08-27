"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ApiClient } from "@/infra/http/apiClient";
import { PlanCreatedApiRepository } from "@/infra/http/postPlan.repository";
import { CreatePlanUseCase } from "@/application/postPlan.usecase";
import { toast } from "react-toastify";
import { dataPlanSubmit } from "@/domain/planCreated.entity";

const formatCurrency = (value: number | undefined) => {
  if (value === undefined || isNaN(value)) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value / 100);
};

const parseCurrency = (value: string): number => {
  const onlyNumbers = value.replace(/[^\d]/g, "");
  if (!onlyNumbers) return 0;
  return parseInt(onlyNumbers, 10);
};

const planSchema = z.object({
  id: z.string().optional(),
  garageId: z.string().min(1, "GarageId obrigatório"),
  description: z.string().min(1, "Descrição obrigatória"),
  startValidity: z.date(),
  endValidity: z.date().optional(),
  priceInCents: z.coerce.number().min(1, "O valor deve ser maior que zero"),
  active: z.boolean(),
  descriptionAvailable: z.string().optional(),
  amountDailyCacellationInCents: z.coerce
    .number()
    .min(0, "O valor não pode ser negativo"),
  veichleType: z.string().min(1, "Selecione o tipo de veículo"),
  totalVacancies: z.coerce.number().min(1, "Precisa ter pelo menos 1 vaga"),
});

type PlanFormSchema = z.infer<typeof planSchema>;

const apiClient = new ApiClient();
const planCreatedRepository = new PlanCreatedApiRepository(apiClient);
const postPlanUsecase = new CreatePlanUseCase(planCreatedRepository);

export function PlanoDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const form = useForm<PlanFormSchema>({
    defaultValues: {
      garageId: "",
      description: "",
      startValidity: new Date(),
      endValidity: undefined,
      priceInCents: undefined, // Mantido como undefined para validação inicial
      active: true,
      descriptionAvailable: "",
      amountDailyCacellationInCents: undefined, // Mantido como undefined
      veichleType: "",
      totalVacancies: 1, // Começa com 1, mas agora é editável corretamente
    },
  });

  const onSubmit = async (values: z.infer<typeof planSchema>) => {
    const payload: dataPlanSubmit = {
      id: values.id ?? "",
      garageId: values.garageId,
      description: values.description,
      startValidity: values.startValidity.toISOString(),
      endValidity: values.endValidity ? values.endValidity.toISOString() : "",
      priceInCents: values.priceInCents.toString(),
      active: values.active.toString(),
      descriptionAvailable: values.descriptionAvailable ?? "",
      amountDailyCacellationInCents:
        values.amountDailyCacellationInCents.toString(),
      veichleType: values.veichleType,
      totalVacancies: values.totalVacancies,
    };

    console.log("Payload enviado:", payload);

    try {
      await postPlanUsecase.execute(payload);
      toast.success("Plano cadastrado com sucesso 🚀");
      setTimeout(() => onOpenChange(false), 500);
      form.reset({
        garageId: "",
        description: "",
        startValidity: new Date(),
        endValidity: undefined,
        priceInCents: undefined,
        active: true,
        descriptionAvailable: "",
        amountDailyCacellationInCents: undefined,
        veichleType: "",
        totalVacancies: 1,
      });
    } catch (error) {
      console.error("Erro ao enviar plano:", error);
      toast.error("Erro ao cadastrar o plano ❌");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Novo Plano</DialogTitle>
          <DialogDescription>
            Preencha os dados para criar um novo plano.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 py-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-1 w-full">
                    <FormLabel>Descrição</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Digite a descrição" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="col-span-1 flex flex-col justify-end">
                    <FormLabel>Status</FormLabel>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span
                        className={
                          field.value
                            ? "text-green-600 font-medium"
                            : "text-gray-500"
                        }
                      >
                        {field.value ? "Ativo" : "Inativo"}
                      </span>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="veichleType"
                render={({ field }) => (
                  <FormItem className="col-span-1 w-full">
                    <FormLabel>Tipo de Veículo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="carro">Carro</SelectItem>
                        <SelectItem value="moto">Moto</SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="totalVacancies"
                render={({ field }) => (
                  <FormItem className="col-span-1 w-full">
                    <FormLabel>Total de Vagas</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          field.onChange(isNaN(value) ? 0 : value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priceInCents"
                render={({ field }) => (
                  <FormItem className="col-span-1 w-full">
                    <FormLabel>Valor (R$)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="R$ 0,00"
                        value={formatCurrency(field.value)}
                        onChange={(e) => {
                          const valueInCents = parseCurrency(e.target.value);
                          field.onChange(valueInCents);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amountDailyCacellationInCents"
                render={({ field }) => (
                  <FormItem className="col-span-1 w-full">
                    <FormLabel>Valor do Cancelamento (R$)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="R$ 0,00"
                        value={formatCurrency(field.value)}
                        onChange={(e) => {
                          const valueInCents = parseCurrency(e.target.value);
                          field.onChange(valueInCents);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startValidity"
                render={({ field }) => (
                  <FormItem className="col-span-1 w-full">
                    <FormLabel>Início da Validade</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "dd/MM/yyyy")
                            : "Selecionar data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endValidity"
                render={({ field }) => (
                  <FormItem className="col-span-1 w-full">
                    <FormLabel>Fim da Validade</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(field.value, "dd/MM/yyyy")
                            : "Selecionar data"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Criar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
