import * as React from "react";

import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  labelClassName?: string;
  wrapperClassName?: string;
  error?: string;
};

function Input({
  className,
  icon: Icon,
  id,
  label,
  labelClassName,
  type,
  wrapperClassName,
  error,
  ...props
}: InputProps) {
  const inputIcon = React.isValidElement<{ className?: string; "aria-hidden"?: boolean }>(
    Icon
  )
    ? React.cloneElement(Icon, {
      "aria-hidden": true,
      className: cn(
        "pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-zinc-400",
        Icon.props.className
      ),
    })
    : Icon;

  const input = (
    <div className="relative">
      {inputIcon}

      <input
        id={id}
        type={type}
        data-slot="input"
        className={cn(
          "h-11 w-full min-w-0 rounded-md border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-900 outline-none transition placeholder:font-medium placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-[#7ad33e] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20",

          error &&
          "border-red-500 focus-visible:ring-red-500",


          Icon && "pl-12",
          className
        )}
        {...props}
      />
    </div>
  );

  if (!label) {
    return input;
  }

  return (
    <div className={cn("space-y-2", wrapperClassName)}>
      <label
        htmlFor={id}
        className={cn("block text-sm font-semibold text-zinc-950", labelClassName)}
      >
        {label}
      </label>

      {input}
    </div>
  );
}

export { Input };
