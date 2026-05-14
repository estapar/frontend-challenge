"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

type GaragesTableHeaderProps = {
    total: number;
    search: string;
    monthlyEnabled: boolean;
    onSearchChange: (value: string) => void;
    onMonthlyEnabledChange: (checked: boolean) => void;
};

export function GaragesTableHeader({
    total,
    search,
    monthlyEnabled,
    onSearchChange,
    onMonthlyEnabledChange,
}: GaragesTableHeaderProps) {
    return (
        <div className="flex flex-col gap-3 border-zinc-200 px-2 py-2 md:flex-row md:items-center md:justify-between md:px-4 md:py-3">
            <label className="flex items-center gap-3">
                <Switch
                    checked={monthlyEnabled}
                    onCheckedChange={onMonthlyEnabledChange}
                    aria-label="Alternar mensalista digital"
                />

                <span className="text-sm font-medium text-zinc-800">
                    Mensalista Digital
                </span>
            </label>

            <span className="text-sm text-zinc-500 md:text-center">
                {total} registros
            </span>

            <div className="relative w-full md:w-[220px]">
                <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                    aria-hidden="true"
                />

                <Input
                    value={search}
                    icon={<Search />}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Buscar por nome"
                    className="h-9 pl-12 text-sm"
                />
            </div>
        </div>
    );
}
