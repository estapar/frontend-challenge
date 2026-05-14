import Image from "next/image";

type UnavailableStateProps = {
  title?: string;
  description?: string;
};

export function UnavailableState({
  title = "Função indisponível",
  description = "Esta função ainda não está disponível.",
}: UnavailableStateProps) {
  return (
    <section className="flex min-h-[260px] flex-1 flex-col items-center justify-center gap-6 bg-white px-8 py-10">
      <Image
        src="/assets/feedback/parking.svg"
        alt="Função indisponível"
        width={150}
        height={120}
        className="h-auto max-w-full"
      />

      <div className="max-w-md text-center">
        <h2 className="text-base font-semibold text-zinc-900">{title}</h2>

        <p className="mt-2 text-sm leading-6 text-zinc-500">{description}</p>
      </div>
    </section>
  );
}
