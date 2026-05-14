"use client";

import { Car } from "lucide-react";

import { MaintenanceState } from "@/src/components/feedback/feedback-maintenance";

import { AppShell } from "../../components/shell/app-shell";
import { PageHeader } from "../../components/shell/page-header";

export default function PlansPage() {
    return (
        <AppShell>
            <PageHeader
                icon={Car}
                title="Mensalistas Digitais"
                description="Gerencie planos, vagas e disponibilidade para mensalistas."
            />
            <MaintenanceState
                description={`Esta funcionalidade ainda está em construção. \n Fique atento para futuras atualizações!`}
            />
        </AppShell>
    );
}
