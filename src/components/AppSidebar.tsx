
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Home, DollarSign, FileText, Settings, Bell } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <SidebarHeader className="border-b bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-6 py-4">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              FLUYT
            </span>
            <span className="text-xs text-muted-foreground">Sistema de Gestão</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            Comercial
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-1">
            <SidebarMenuItem>
              <SidebarMenuButton 
                isActive 
                className="w-full justify-start gap-3 h-11 px-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 dark:border-blue-500/20 text-blue-700 dark:text-blue-300 font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="p-1.5 bg-blue-500/20 rounded-lg">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span>Clientes</span>
                  <span className="text-xs text-blue-600/70">Gestão completa</span>
                </div>
                <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 text-xs">
                  Active
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start gap-3 h-11 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 group">
                <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                  <Home className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span>Ambientes</span>
                  <span className="text-xs text-slate-500">Em breve</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start gap-3 h-11 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 group">
                <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span>Orçamentos</span>
                  <span className="text-xs text-slate-500">Em breve</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start gap-3 h-11 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 group">
                <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span>Contratos</span>
                  <span className="text-xs text-slate-500">Em breve</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-8">
          <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            Sistema
          </SidebarGroupLabel>
          <SidebarMenu className="space-y-1">
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start gap-3 h-11 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 group">
                <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span>Notificações</span>
                  <span className="text-xs text-slate-500">2 novas</span>
                </div>
                <Badge variant="destructive" className="ml-auto text-xs">2</Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton className="w-full justify-start gap-3 h-11 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 group">
                <div className="p-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg group-hover:bg-slate-200 dark:group-hover:bg-slate-600 transition-colors">
                  <Settings className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start">
                  <span>Configurações</span>
                  <span className="text-xs text-slate-500">Personalizar</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 border border-slate-200 dark:border-slate-600">
          <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-medium">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 min-w-0">
            <span className="font-medium text-sm text-slate-900 dark:text-slate-100 truncate">
              Admin
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
              admin@fluyt.com
            </span>
          </div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
