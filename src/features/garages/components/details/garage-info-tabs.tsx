import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function GarageInfoTabs() {
  return (
    <Tabs value="monthly-digital">
      <TabsList className="h-12">
        <TabsTrigger value="monthly-digital">
          Mensalista Digital
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
