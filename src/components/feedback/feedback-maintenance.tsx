import Image from "next/image";

type MaintenanceStateProps = {
  description: string;
};

export function MaintenanceState({
  description,
}: MaintenanceStateProps) {
  return (
    <section className="mt-2 flex flex-col items-center gap-12 rounded-2xl bg-white p-8">
      <Image
        src="/assets/feedback/feedback-acess.svg"
        alt="Página em construção"
        width={300}
        height={160}
        className="h-auto max-w-full"
      />

      <div className="max-w-md">
        <p className="whitespace-pre-line text-center text-base leading-7 text-zinc-500">
          {description}
        </p>
      </div>
    </section>
  );
}