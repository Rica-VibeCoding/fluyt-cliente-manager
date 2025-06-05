
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ClientePage } from "@/components/clientes/ClientePage";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <ClientePage />
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
