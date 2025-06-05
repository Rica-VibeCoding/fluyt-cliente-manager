
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, TrendingUp, Users, UserPlus } from 'lucide-react';

interface ClienteHeaderProps {
  totalClientes: number;
  onNovoCliente: () => void;
}

export function ClienteHeader({ totalClientes, onNovoCliente }: ClienteHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header principal */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            Gestão de Clientes
          </h1>
          <p className="text-lg text-muted-foreground font-medium">
            Centralize e gerencie todos os seus clientes de forma eficiente
          </p>
        </div>
        
        <Button 
          onClick={onNovoCliente} 
          size="lg"
          className="gap-3 h-12 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl font-semibold"
        >
          <UserPlus className="h-5 w-5" />
          Novo Cliente
        </Button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                Total de Clientes
              </p>
              <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                {totalClientes.toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-xl shadow-sm">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% este mês
            </Badge>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-700 dark:text-green-300 uppercase tracking-wide">
                Clientes Ativos
              </p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                {Math.floor(totalClientes * 0.85).toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-xl shadow-sm">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200">
              85% do total
            </Badge>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300 uppercase tracking-wide">
                Novos (30 dias)
              </p>
              <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                {Math.floor(totalClientes * 0.12).toLocaleString('pt-BR')}
              </p>
            </div>
            <div className="p-3 bg-purple-500 rounded-xl shadow-sm">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200">
              +8 esta semana
            </Badge>
          </div>
        </Card>
      </div>
    </div>
  );
}
