import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const appButtonVariants = cva(
  "rounded-[12px] px-4 py-2 font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "cursor-pointer bg-[#7AD33E] text-white border border-[#7AD33E] hover:bg-[#65B32A] hover:border-[#65B32A] transition-colors duration-200",
        secondary:
          "cursor-pointer border border-[#7AD33E] text-[#7AD33E] bg-transparent hover:bg-[#7AD33E]/10",
        canceled:
          "cursor-pointer border border-gray-400 text-black bg-transparent hover:bg-gray-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof appButtonVariants> {}

export function AppButton({ className, variant, ...props }: AppButtonProps) {
  return (
    <Button
      className={cn(appButtonVariants({ variant }), className)}
      {...props}
    />
  );
}
