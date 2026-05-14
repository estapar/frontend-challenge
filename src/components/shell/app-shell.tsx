import { AuthGuard } from "@/src/features/auth/components/auth-guard";

import { ShellFrame } from "./shell-frame";

type Props = {
  children: React.ReactNode;
};

export function AppShell({
  children,
}: Props) {
  return (
    <AuthGuard>
      <ShellFrame>{children}</ShellFrame>
    </AuthGuard>
  );
}
