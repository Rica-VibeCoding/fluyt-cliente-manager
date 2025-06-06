
import { MoreHorizontal, Edit, Trash2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Cliente } from '@/types/cliente';
import { useNavigate } from 'react-router-dom';

interface ClienteActionsMenuProps {
  cliente: Cliente;
  onEditar: (cliente: Cliente) => void;
  onRemover: (id: string) => void;
}

export function ClienteActionsMenu({ cliente, onEditar, onRemover }: ClienteActionsMenuProps) {
  const navigate = useNavigate();

  const handleCriarAmbientes = () => {
    navigate(`/ambientes?clienteId=${cliente.id}&clienteNome=${encodeURIComponent(cliente.nome)}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={handleCriarAmbientes}>
          <Home className="mr-2 h-4 w-4" />
          Criar Ambientes
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onEditar(cliente)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="text-red-600" 
          onClick={() => onRemover(cliente.id)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Remover
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
