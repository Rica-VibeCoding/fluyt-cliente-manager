
import { useState } from 'react';
import { ClienteHeader } from './ClienteHeader';
import { ClienteFiltros } from './ClienteFiltros';
import { ClienteTabela } from './ClienteTabela';
import { ClienteModal } from './ClienteModal';
import { useClientes } from '@/hooks/useClientes';
import { Cliente } from '@/types/cliente';

export function ClientePage() {
  const {
    clientes,
    vendedores,
    filtros,
    setFiltros,
    isLoading,
    adicionarCliente,
    atualizarCliente,
    removerCliente,
    totalClientes
  } = useClientes();

  const [modalAberto, setModalAberto] = useState(false);
  const [clienteEditando, setClienteEditando] = useState<Cliente | null>(null);

  const handleNovoCliente = () => {
    setClienteEditando(null);
    setModalAberto(true);
  };

  const handleEditarCliente = (cliente: Cliente) => {
    setClienteEditando(cliente);
    setModalAberto(true);
  };

  const handleSalvarCliente = async (dados: any) => {
    if (clienteEditando) {
      await atualizarCliente(clienteEditando.id, dados);
    } else {
      const vendedor = vendedores.find(v => v.id === dados.vendedor_id);
      await adicionarCliente({
        ...dados,
        vendedor_nome: vendedor?.nome || ''
      });
    }
    setModalAberto(false);
    setClienteEditando(null);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <ClienteHeader 
        totalClientes={totalClientes}
        onNovoCliente={handleNovoCliente}
      />
      
      <ClienteFiltros 
        filtros={filtros}
        onFiltrosChange={setFiltros}
        vendedores={vendedores}
      />
      
      <ClienteTabela 
        clientes={clientes}
        isLoading={isLoading}
        onEditarCliente={handleEditarCliente}
        onRemoverCliente={removerCliente}
      />

      <ClienteModal
        aberto={modalAberto}
        onFechar={() => {
          setModalAberto(false);
          setClienteEditando(null);
        }}
        cliente={clienteEditando}
        vendedores={vendedores}
        onSalvar={handleSalvarCliente}
        isLoading={isLoading}
      />
    </div>
  );
}
