import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { GaragePlanModal } from "./garage-plan-modal";

describe("GaragePlanModal", () => {
  it("validates required fields before submitting", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <GaragePlanModal
        mode="create"
        open
        onClose={vi.fn()}
        onSubmit={onSubmit}
      />
    );

    await user.click(screen.getByRole("button", { name: "Criar" }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText(/informe a descr/i)).toBeInTheDocument();
    expect(screen.getByText(/informe o fim/i)).toBeInTheDocument();
  });

  it("submits a valid new plan", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const randomUUID = vi.spyOn(crypto, "randomUUID");
    randomUUID.mockReturnValue("new-plan-id");

    render(
      <GaragePlanModal
        mode="create"
        open
        onClose={vi.fn()}
        onSubmit={onSubmit}
      />
    );

    await user.type(screen.getByLabelText(/descr/i), "Mensalista Carro");
    await user.clear(screen.getByLabelText(/total de vagas/i));
    await user.type(screen.getByLabelText(/total de vagas/i), "50");
    await user.clear(screen.getByLabelText(/valor \(r\$\)/i));
    await user.type(screen.getByLabelText(/valor \(r\$\)/i), "385");
    await user.clear(screen.getByLabelText(/cancelamento/i));
    await user.type(screen.getByLabelText(/cancelamento/i), "10");
    await user.clear(screen.getByLabelText(/in/i));
    await user.type(screen.getByLabelText(/in/i), "2026-01-01");
    await user.type(screen.getByLabelText(/fim/i), "2026-12-31");
    await user.click(screen.getByRole("button", { name: "Criar" }));

    expect(onSubmit).toHaveBeenCalledWith({
      id: "new-plan-id",
      description: "Mensalista Carro",
      value: 385,
      vacancies: 50,
      occupied: 0,
      available: 50,
      status: "active",
      vehicleType: "car",
      cancellationValue: 10,
      startsAt: "2026-01-01",
      endsAt: "2026-12-31",
    });
  });

  it("submits an edited plan preserving its id and occupied vacancies", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <GaragePlanModal
        mode="edit"
        open
        plan={{
          id: "plan-1",
          description: "Mensalista Carro",
          value: 300,
          vacancies: 50,
          occupied: 12,
          available: 38,
          status: "inactive",
        }}
        onClose={vi.fn()}
        onSubmit={onSubmit}
      />
    );

    await user.clear(screen.getByLabelText(/descr/i));
    await user.type(screen.getByLabelText(/descr/i), "Mensalista Atualizado");
    await user.type(screen.getByLabelText(/fim/i), "2026-12-31");
    await user.click(screen.getByRole("button", { name: "Salvar" }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "plan-1",
        description: "Mensalista Atualizado",
        occupied: 12,
        available: 38,
        status: "inactive",
      })
    );
  });
});
