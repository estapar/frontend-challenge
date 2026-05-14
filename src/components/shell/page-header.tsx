import { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
};

export function PageHeader({
  title,
  description,
  icon: Icon,
}: PageHeaderProps) {
  return (
    <header>
      <div className="flex items-center gap-3">
        {Icon && (
          <Icon
            size={44}
            className="text-[#7ad33e]"
            aria-hidden="true"
          />
        )}

        <h1 className="text-3xl font-[400] text-zinc-800">
          {title}
        </h1>
      </div>

      <p className="mb-10 mt-1 text-lg text-zinc-500">
        {description}
      </p>
    </header>
  );
}
