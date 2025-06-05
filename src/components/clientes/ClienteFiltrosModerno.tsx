
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, X, Filter, Calendar, User, MapPin } from 'lucide-react';
import { FiltrosCliente, Vendedor, PROCEDENCIAS } from '@/types/cliente';
import { useState, useEffect } from 'react';

interface ClienteFiltrosModernoProps {
  filtros: FiltrosCliente;
  onFiltrosChange: (filtros: FiltrosCliente) => void;
  vendedores: Vendedor[];
}

export function ClienteFiltrosModerno({ filtros, onFiltrosChange, vendedores }: ClienteFiltrosModernoProps) {
  const [busca, setBusca] = useState(filtros.busca || '');
  const [mostrarFiltrosAvancados, setMostrarFiltrosAvancados] = useState(false);

  // Debounce para busca
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltrosChange({ ...filtros, busca: busca || undefined });
    }, 300);

    return () => clearTimeout(timer);
  }, [busca]);

  const limparFiltros = () => {
    setBusca('');
    onFiltrosChange({});
    setMostrarFiltrosAvancados(false);
  };

  const filtrosAtivos = Object.values(filtros).filter(Boolean).length;

  return (
    <Card className="p-6 bg-gradient-to-r from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border shadow-sm">
      <div className="space-y-6">
        {/* Busca principal */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, CPF/CNPJ, telefone ou email..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-12 h-12 text-base bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm focus:shadow-md transition-shadow"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setMostrarFiltrosAvancados(!mostrarFiltrosAvancados)}
            className={`h-12 px-6 gap-2 border-slate-200 dark:border-slate-700 ${
              mostrarFiltrosAvancados ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300' : ''
            }`}
          >
            <Filter className="h-4 w-4" />
            Filtros Avançados
            {filtrosAtivos > 0 && (
              <Badge variant="destructive" className="ml-1 px-1.5 py-0.5 text-xs">
                {filtrosAtivos}
              </Badge>
            )}
          </Button>
        </div>

        {/* Filtros avançados */}
        {mostrarFiltrosAvancados && (
          <div className="space-y-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Tipo de Venda
                </label>
                <Select
                  value={filtros.tipo_venda || 'all'}
                  onValueChange={(value) => 
                    onFiltrosChange({ ...filtros, tipo_venda: value === 'all' ? undefined : value as any })
                  }
                >
                  <SelectTrigger className="h-10 bg-white dark:bg-slate-800">
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os tipos</SelectItem>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                    <SelectItem value="FUTURA">Futura</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Vendedor
                </label>
                <Select
                  value={filtros.vendedor_id || 'all'}
                  onValueChange={(value) => 
                    onFiltrosChange({ ...filtros, vendedor_id: value === 'all' ? undefined : value })
                  }
                >
                  <SelectTrigger className="h-10 bg-white dark:bg-slate-800">
                    <SelectValue placeholder="Selecionar vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos vendedores</SelectItem>
                    {vendedores.map(vendedor => (
                      <SelectItem key={vendedor.id} value={vendedor.id}>
                        {vendedor.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Procedência
                </label>
                <Select
                  value={filtros.procedencia || 'all'}
                  onValueChange={(value) => 
                    onFiltrosChange({ ...filtros, procedencia: value === 'all' ? undefined : value })
                  }
                >
                  <SelectTrigger className="h-10 bg-white dark:bg-slate-800">
                    <SelectValue placeholder="Selecionar procedência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas procedências</SelectItem>
                    {PROCEDENCIAS.map(proc => (
                      <SelectItem key={proc} value={proc}>
                        {proc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Período
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={filtros.data_inicio || ''}
                    onChange={(e) => 
                      onFiltrosChange({ ...filtros, data_inicio: e.target.value || undefined })
                    }
                    className="h-10 text-sm bg-white dark:bg-slate-800"
                  />
                  <Input
                    type="date"
                    value={filtros.data_fim || ''}
                    onChange={(e) => 
                      onFiltrosChange({ ...filtros, data_fim: e.target.value || undefined })
                    }
                    className="h-10 text-sm bg-white dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Filtros ativos e botão limpar */}
            {filtrosAtivos > 0 && (
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Filtros ativos:
                  </span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {filtrosAtivos} filtro{filtrosAtivos > 1 ? 's' : ''}
                  </Badge>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={limparFiltros}
                  className="h-8 px-3 text-sm gap-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  <X className="h-3 w-3" />
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
