import { BadgePercent, CircleDollarSign, Settings } from "lucide-react";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export type GaragePlansMenuItem = "plans" | "discounts" | "settings";

const menuItems = [
  {
    id: "plans",
    label: "Planos",
    icon: CircleDollarSign,
  },
  {
    id: "discounts",
    label: "Descontos",
    icon: BadgePercent,
  },
  {
    id: "settings",
    label: "Configurações",
    icon: Settings,
  },
] satisfies Array<{
  id: GaragePlansMenuItem;
  label: string;
  icon: typeof CircleDollarSign;
}>;

export function GaragePlansMenu() {
  return (
    <aside className="w-full shrink-0 bg-zinc-50 md:w-[168px]">
      <TabsList className="flex overflow-x-auto overflow-y-hidden rounded-none border-0 bg-transparent md:block md:py-1">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <TabsTrigger
              key={item.id}
              value={item.id}
              className={`
                h-11 min-w-max flex-1 justify-center gap-3 rounded-none border-b-4 px-4 text-sm md:w-full md:justify-start md:border-b-0 md:border-l-4
                data-[state=active]:border-x-transparent data-[state=active]:border-t-transparent data-[state=active]:border-b-[#7ad33e] data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:text-zinc-800 md:data-[state=active]:border-y-transparent md:data-[state=active]:border-r-transparent md:data-[state=active]:border-l-[#7ad33e]
              `}
            >
              <Icon size={17} className="text-zinc-500" />
              {item.label}
            </TabsTrigger>
          );
        })}
      </TabsList>
    </aside>
  );
}
