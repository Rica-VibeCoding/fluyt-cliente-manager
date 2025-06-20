
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { AmbientePage } from "@/components/ambientes/AmbientePage";

const Ambientes = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <AmbientePage />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Ambientes;
