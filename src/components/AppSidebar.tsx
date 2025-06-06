
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Home, BarChart3, Settings, User } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

const menuItems = [
  {
    title: "Clientes",
    url: "/",
    icon: Users,
    badge: "12",
  },
  {
    title: "Ambientes",
    url: "/ambientes",
    icon: Home,
    badge: "3",
  },
  {
    title: "Relatórios",
    url: "/relatorios",
    icon: BarChart3,
  },
  {
    title: "Configurações",
    url: "/configuracoes",
    icon: Settings,
  },
]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar className="border-r-0 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-slate-600 to-slate-700 rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent">
              MóvelCRM
            </h2>
            <p className="text-xs text-muted-foreground font-medium">Sistema de Gestão</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        group transition-all duration-200 rounded-xl h-12
                        ${isActive 
                          ? 'bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600 shadow-sm border border-slate-300 dark:border-slate-600' 
                          : 'hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                        }
                      `}
                    >
                      <Link to={item.url} className="flex items-center gap-3 px-3">
                        <div className={`
                          p-2 rounded-lg transition-colors
                          ${isActive 
                            ? 'bg-slate-600 text-white shadow-sm' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-600 group-hover:text-white'
                          }
                        `}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <span className={`font-medium ${isActive ? 'text-slate-900 dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}`}>
                            {item.title}
                          </span>
                        </div>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={`
                              text-xs h-5 px-2
                              ${isActive 
                                ? 'bg-slate-600 text-white' 
                                : 'bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }
                            `}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-6 px-2">
          <Card className="bg-gradient-to-br from-slate-600 to-slate-700 border-slate-300 dark:border-slate-600 text-white">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-slate-200">Sistema Online</span>
                </div>
                <p className="text-xs text-slate-300">
                  Orçamentos: <span className="font-semibold text-white">15 ativos</span>
                </p>
                <p className="text-xs text-slate-300">
                  Última sync: <span className="font-semibold text-white">há 2 min</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Card className="bg-slate-200 dark:bg-slate-800 border-slate-300 dark:border-slate-700">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-slate-600 text-white text-sm font-semibold">
                  JD
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                  João Vendedor
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Vendedor
                </p>
              </div>
              <User className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            </div>
          </CardContent>
        </Card>
      </SidebarFooter>
    </Sidebar>
  )
}
