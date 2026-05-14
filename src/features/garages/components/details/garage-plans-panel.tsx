"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { UnavailableState } from "@/src/components/feedback/feedback-unavailable";

import { GaragePlan } from "../../types/garage.details";
import { GaragePlansMenu } from "./garage-plans-menu";
import { GaragePlansSection } from "./garage-plans-section";

type GaragePlansPanelProps = {
  garageId: string;
  plans: GaragePlan[];
};

export function GaragePlansPanel({
  garageId,
  plans,
}: GaragePlansPanelProps) {
  return (
    <Tabs
      defaultValue="plans"
      orientation="vertical"
      className="mt-5 flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white md:flex-row"
    >
      <GaragePlansMenu />

      <TabsContent value="plans" className="m-0 min-w-0 flex-1">
        <GaragePlansSection garageId={garageId} plans={plans} />
      </TabsContent>

      <TabsContent value="discounts" className="m-0 min-w-0 flex-1">
        <UnavailableState
          title="Descontos indisponíveis"
          description="Esta função ainda não está disponível para esta garagem."
        />
      </TabsContent>

      <TabsContent value="settings" className="m-0 min-w-0 flex-1">
        <UnavailableState
          title="Configurações indisponíveis"
          description="Esta função ainda não está disponível para esta garagem."
        />
      </TabsContent>
    </Tabs>
  );
}
