import { Building2 } from "lucide-react";
import { AppShell } from "../../components/shell/app-shell";
import { PageHeader } from "../../components/shell/page-header";
import { GaragePageContent } from "./components/table/garage-page-content";

export default async function Garage() {
    return (
        <AppShell>

            <PageHeader
                icon={Building2}
                title="Garagens"
                description="Visualize as garagens habilitadas para mensalistas digitais."
            />

            <GaragePageContent />
        </AppShell>
    );
}
