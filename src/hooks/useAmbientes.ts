
import { useState } from 'react';
import { Ambiente, AmbienteFormData } from '@/types/ambiente';

export const useAmbientes = () => {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const adicionarAmbiente = (data: AmbienteFormData) => {
    const novoAmbiente: Ambiente = {
      id: Date.now().toString(),
      nome: data.nome,
      acabamentos: data.acabamentos.map(acabamento => ({
        ...acabamento,
        id: Date.now().toString() + Math.random()
      })),
      valorTotal: data.acabamentos.reduce((total, acabamento) => total + acabamento.valor, 0)
    };

    setAmbientes(prev => [...prev, novoAmbiente]);
  };

  const removerAmbiente = (id: string) => {
    setAmbientes(prev => prev.filter(ambiente => ambiente.id !== id));
  };

  const importarXML = async () => {
    setIsLoading(true);
    
    // Simulação da importação XML
    setTimeout(() => {
      const ambientesSimulados: Ambiente[] = [
        {
          id: 'xml-1',
          nome: 'Cozinha',
          acabamentos: [
            {
              id: '1',
              tipo: 'Porta',
              cor: 'Itapuã',
              espessura: '15 mm',
              material: 'MDP',
              valor: 3000
            },
            {
              id: '2',
              tipo: 'Caixa',
              cor: 'Branco TX',
              espessura: '15 mm',
              material: 'MDP',
              valor: 2500
            },
            {
              id: '3',
              tipo: 'Painel',
              cor: 'Avellano',
              espessura: '18 mm',
              material: 'MDF',
              valor: 3858
            }
          ],
          valorTotal: 9358
        },
        {
          id: 'xml-2',
          nome: 'Dormitório',
          acabamentos: [
            {
              id: '4',
              tipo: 'Porta',
              cor: 'Carvalho',
              espessura: '18 mm',
              material: 'MDF',
              valor: 4200
            },
            {
              id: '5',
              tipo: 'Caixa',
              cor: 'Branco TX',
              espessura: '15 mm',
              material: 'MDP',
              valor: 2800
            }
          ],
          valorTotal: 7000
        }
      ];

      setAmbientes(prev => [...prev, ...ambientesSimulados]);
      setIsLoading(false);
    }, 2000);
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
