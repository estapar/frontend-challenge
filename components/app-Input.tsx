import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type AppInputProps = {
  label?: string;
  placeholder?: string;
  icon?: ReactNode;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AppInput = ({
  label,
  placeholder,
  icon,
  type = "text",
  value,
  onChange,
}: AppInputProps) => {
  return (
    <div className="w-full space-y-3">
      <Label>{label}</Label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </span>
        )}
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={cn(
            "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7AD33E] focus-visible:border-[#7AD33E]",
            icon ? "pl-10" : ""
          )}
        />
      </div>
    </div>
  );
};
