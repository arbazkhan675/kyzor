import { RequireRole } from "@/components/auth/RequireRole";
import { SidebarShell } from "@/components/layout/SidebarShell";
import { InternSidebar } from "@/components/sidebar/InternSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole allow="intern">
      <SidebarShell sidebar={<InternSidebar />} topbarTitle="Intern Dashboard">
        {children}
      </SidebarShell>
    </RequireRole>
  );
}