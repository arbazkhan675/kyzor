import { RequireRole } from "@/components/auth/RequireRole";
import { SidebarShell } from "@/components/layout/SidebarShell";
import { AdminSidebar } from "@/components/sidebar/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireRole allow="admin">
      <SidebarShell sidebar={<AdminSidebar />} topbarTitle="Admin Panel">
        {children}
      </SidebarShell>
    </RequireRole>
  );
}