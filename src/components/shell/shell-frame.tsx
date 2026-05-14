import { Sidebar } from "../sidebar/sidebar";
import { Topbar } from "../topbar/topbar";

type ShellFrameProps = {
  children: React.ReactNode;
};

export function ShellFrame({ children }: ShellFrameProps) {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
