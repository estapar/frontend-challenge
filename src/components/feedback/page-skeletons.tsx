import { Skeleton } from "@/components/ui/skeleton";

function SkeletonBlock({ className }: { className: string }) {
  return <Skeleton className={className} />;
}

export function DashboardPageSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <SkeletonBlock className="h-8 w-[360px]" />
        <SkeletonBlock className="h-4 w-[520px]" />
        <SkeletonBlock className="h-4 w-[420px]" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <SkeletonBlock className="h-[170px] w-full" />
        <SkeletonBlock className="h-[170px] w-full" />
      </div>
    </div>
  );
}

export function GaragesTableSkeleton() {
  return (
    <div className="w-full overflow-hidden">
      <div className="hidden grid-cols-[90px_1.2fr_1.8fr_1fr_120px_80px] border-b-[5px] border-zinc-300 px-2 py-3 md:grid">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonBlock key={index} className="h-4 w-16" />
        ))}
      </div>

      <div>
        {Array.from({ length: 8 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="mb-3 grid grid-cols-1 gap-3 rounded-md border border-zinc-200 p-4 last:mb-0 md:mb-0 md:grid-cols-[90px_1.2fr_1.8fr_1fr_120px_80px] md:rounded-none md:border-x-0 md:border-t-0 md:px-2 md:py-4"
          >
            <SkeletonBlock className="h-4 w-14" />
            <SkeletonBlock className="h-4 w-[70%]" />
            <SkeletonBlock className="h-4 w-[82%]" />
            <SkeletonBlock className="h-4 w-[65%]" />
            <SkeletonBlock className="h-4 w-12" />
            <div className="flex justify-end">
              <SkeletonBlock className="size-8 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GaragesPageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <SkeletonBlock className="h-8 w-44" />
        <SkeletonBlock className="h-4 w-[360px]" />
      </div>

      <div className="flex items-center justify-between rounded-sm border border-zinc-200 bg-white px-8 py-6">
        <SkeletonBlock className="h-5 w-40" />
        <SkeletonBlock className="h-4 w-20" />
        <SkeletonBlock className="h-9 w-[220px]" />
      </div>

      <div className="overflow-hidden rounded-sm border border-zinc-200 bg-white">
        <GaragesTableSkeleton />
      </div>
    </div>
  );
}

export function PlansPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <SkeletonBlock className="h-8 w-[280px]" />
        <SkeletonBlock className="h-4 w-[460px]" />
      </div>

      <div className="flex min-h-[360px] flex-col items-center justify-center gap-8 rounded-sm border border-zinc-200 bg-white">
        <SkeletonBlock className="h-[160px] w-[300px]" />
        <SkeletonBlock className="h-4 w-[420px]" />
        <SkeletonBlock className="h-4 w-[360px]" />
      </div>
    </div>
  );
}

export function GarageDetailsPageSkeleton() {
  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/75 animate-in fade-in duration-300">
      <main className="fixed inset-y-0 right-0 left-0 overflow-y-auto bg-white px-4 py-5 shadow-[-18px_0_32px_rgba(15,23,42,0.28)] animate-in slide-in-from-right duration-300 ease-out md:left-20 md:px-8 md:py-6">
        <div className="space-y-7">
          <div className="space-y-5">
            <div className="flex items-start gap-4 md:items-center md:gap-6">
              <SkeletonBlock className="size-9 rounded-lg" />
              <SkeletonBlock className="h-8 w-full max-w-[460px]" />
            </div>
            <SkeletonBlock className="h-4 w-36" />
            <div className="space-y-4">
              <SkeletonBlock className="h-4 w-full max-w-[360px]" />
              <SkeletonBlock className="h-4 w-full max-w-[520px]" />
            </div>
          </div>

          <SkeletonBlock className="h-12 w-full rounded-t-md" />

          <div className="flex flex-col items-stretch gap-4 md:flex-row md:items-center">
            <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
              <SkeletonBlock className="h-[96px] w-full rounded-lg" />
              <SkeletonBlock className="h-[96px] w-full rounded-lg" />
              <SkeletonBlock className="h-[96px] w-full rounded-lg" />
            </div>
            <SkeletonBlock className="h-[96px] w-full rounded-md md:w-[96px]" />
          </div>

          <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white md:flex-row">
            <div className="flex w-full shrink-0 gap-3 overflow-hidden bg-zinc-50 p-4 md:block md:w-[168px] md:space-y-3">
              <SkeletonBlock className="h-5 w-24" />
              <SkeletonBlock className="h-5 w-28" />
              <SkeletonBlock className="h-5 w-32" />
            </div>

            <div className="flex-1 space-y-6 px-4 py-5 md:px-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <SkeletonBlock className="h-6 w-44" />
                <SkeletonBlock className="h-9 w-32" />
              </div>
              <GaragesTableSkeleton />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
