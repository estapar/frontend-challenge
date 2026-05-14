import { LoaderCircle } from "lucide-react";

type LoadingStateProps = {
  label?: string;
  fullScreen?: boolean;
};

export function LoadingState({
  label = "Carregando...",
  fullScreen = true,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center gap-4 px-4 ${
        fullScreen ? "min-h-screen bg-[#f4f5f6]" : "min-h-full bg-white"
      }`}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-white shadow-sm">
        <LoaderCircle
          className="size-7 animate-spin text-[#7ad33e]"
          aria-hidden="true"
        />
      </div>

      <p className="text-sm font-medium text-zinc-500">{label}</p>
    </div>
  );
}
