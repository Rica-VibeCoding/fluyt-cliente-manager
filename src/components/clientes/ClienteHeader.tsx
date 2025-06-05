
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ClienteHeaderProps {
  totalClientes: number;
  onNovoCliente: () => void;
}

export function ClienteHeader({ totalClientes, onNovoCliente }: ClienteHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <span className="text-2xl">👥</span>
          Gestão de Clientes
        </h1>
        <p className="text-muted-foreground mt-1">
          📊 {totalClientes} clientes cadastrados
        </p>
      </div>
      
      <Button onClick={onNovoCliente} className="gap-2">
        <Plus className="h-4 w-4" />
        Novo Cliente
      </Button>
    </div>
  );
}
