
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Cliente } from '@/types/cliente';
import { MoreHorizontal, Edit, FileText, Home, Plus } from 'lucide-react';

interface ClienteTabelaProps {
  clientes: Cliente[];
  isLoading: boolean;
  onEditarCliente: (cliente: Cliente) => void;
  onRemoverCliente: (id: string) => void;
}

export function ClienteTabela({ 
  clientes, 
  isLoading, 
  onEditarCliente, 
  onRemoverCliente 
}: ClienteTabelaProps) {
  if (isLoading) {
    return <ClienteTabelaSkeleton />;
  }

  if (clientes.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold mb-2">Nenhum cliente encontrado</h3>
          <p className="text-muted-foreground text-center max-w-md">
            Tente ajustar os filtros ou cadastre um novo cliente para começar.
          </p>
        </div>
      </div>
    );
  }

  const formatarTelefone = (telefone: string) => {
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const obterIniciais = (nome: string) => {
    return nome.split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const gerarNumeroContrato = (clienteId: string) => {
    // Simular número de contrato baseado no ID do cliente
    const numeroBase = parseInt(clienteId.slice(-6), 16) || Math.floor(Math.random() * 100000);
    return `CON-${numeroBase.toString().padStart(6, '0')}`;
  };

  const obterStatusCliente = () => {
    const statuses = ['ORÇAMENTO', 'VENDIDO', 'PERDIDO', 'NEGOCIAÇÃO'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const obterCorStatus = (status: string) => {
    switch (status) {
      case 'VENDIDO':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'ORÇAMENTO':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'NEGOCIAÇÃO':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'PERDIDO':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="rounded-md border">
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader className="sticky top-0 bg-background z-10">
            <TableRow>
              <TableHead className="w-12">Avatar</TableHead>
              <TableHead>Nome Completo</TableHead>
              <TableHead>Contrato/Orçamento</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Procedência</TableHead>
              <TableHead>Vendedor</TableHead>
              <TableHead>Data Cadastro</TableHead>
              <TableHead className="w-20">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clientes.map((cliente) => {
              const status = obterStatusCliente();
              return (
                <TableRow 
                  key={cliente.id} 
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs font-medium">
                        {obterIniciais(cliente.nome)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{cliente.nome}</div>
                      <div className="text-xs text-muted-foreground">
                        {cliente.cidade}, {cliente.uf}
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="font-mono text-sm">
                    {gerarNumeroContrato(cliente.id)}
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      className={`font-medium ${obterCorStatus(status)}`}
                    >
                      {status}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {formatarTelefone(cliente.telefone)}
                      </div>
                      {cliente.email && (
                        <div className="text-xs text-muted-foreground">
                          {cliente.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant={cliente.tipo_venda === 'NORMAL' ? 'default' : 'secondary'}
                      className="font-medium"
                    >
                      {cliente.tipo_venda}
                    </Badge>
                  </TableCell>
                  
                  <TableCell className="text-sm">
                    {cliente.procedencia}
                  </TableCell>
                  
                  <TableCell className="text-sm font-medium">
                    {cliente.vendedor_nome}
                  </TableCell>
                  
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(cliente.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}
                  </TableCell>
                  
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 hover:bg-muted"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem 
                          onClick={() => onEditarCliente(cliente)}
                          className="gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          Editar Cliente
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <FileText className="h-4 w-4" />
                          Ver Histórico
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Home className="h-4 w-4" />
                          Criar Ambiente
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-2">
                          <Plus className="h-4 w-4" />
                          Novo Orçamento
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}

function ClienteTabelaSkeleton() {
  return (
    <div className="rounded-md border">
      <div className="space-y-3 p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-6 w-[80px] rounded-full" />
            <Skeleton className="h-4 w-[120px]" />
            <Skeleton className="h-6 w-[60px] rounded-full" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-8 w-8" />
          </div>
        ))}
      </div>
    </div>
  );
}
