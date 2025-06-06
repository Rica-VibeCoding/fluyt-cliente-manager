
import { useState } from 'react';
import { Ambiente, AmbienteFormData } from '@/types/ambiente';

export const useAmbientes = (clienteId?: string) => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const adicionarAmbiente = (data: AmbienteFormData) => {
    const novoAmbiente: Ambiente = {
      id: Date.now().toString(),
      nome: data.nome,
      acabamentos: data.acabamentos.map((acabamento, index) => ({
        ...acabamento,
        id: `${Date.now()}-${index}`,
        valor: 0 // Valor padrão pois agora o valor é único por ambiente
      })),
      valorTotal: data.valorTotal,
      clienteId: clienteId
    };

    setAmbientes(prev => [...prev, novoAmbiente]);
  };

  const removerAmbiente = (id: string) => {
    setAmbientes(prev => prev.filter(ambiente => ambiente.id !== id));
  };

  const importarXML = async () => {
    if (!clienteId) return;
    
    setIsLoading(true);
    
    // Função provisória que cria um ambiente fictício
    setTimeout(() => {
      const ambienteFicticio: Ambiente = {
        id: 'xml-' + Date.now(),
        nome: 'Ambiente Importado (Fictício)',
        acabamentos: [
          {
            id: 'acabamento-1',
            tipo: 'Porta',
            cor: 'Madeira Natural',
            espessura: '18mm',
            material: 'MDF',
            valor: 0
          },
          {
            id: 'acabamento-2',
            tipo: 'Caixa',
            cor: 'Branco Texturizado',
            espessura: '15mm',
            material: 'MDP',
            valor: 0
          },
          {
            id: 'acabamento-3',
            tipo: 'Painel',
            cor: 'Carvalho Europeu',
            espessura: '18mm',
            material: 'MDF',
            valor: 0
          }
        ],
        valorTotal: 5500,
        clienteId: clienteId
      };

      setAmbientes(prev => [...prev, ambienteFicticio]);
      setIsLoading(false);
      
      // Log para demonstrar que a função foi executada
      console.log('Ambiente fictício criado:', ambienteFicticio);
    }, 1500); // Simula carregamento de 1.5 segundos
  };

  const valorTotalGeral = ambientes.reduce((total, ambiente) => total + ambiente.valorTotal, 0);

  return {
    ambientes,
    adicionarAmbiente,
    removerAmbiente,
    importarXML,
    isLoading,
    valorTotalGeral
  };
};
