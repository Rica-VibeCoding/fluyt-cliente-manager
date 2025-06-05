
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ClienteFormEssencial } from './ClienteFormEssencial';
import { ClienteFormEndereco } from './ClienteFormEndereco';
import { ClienteFormConfig } from './ClienteFormConfig';
import { useClienteForm } from '@/hooks/useClienteForm';
import { Cliente, Vendedor } from '@/types/cliente';

interface ClienteModalProps {
  aberto: boolean;
  onFechar: () => void;
  cliente?: Cliente | null;
  vendedores: Vendedor[];
  onSalvar: (dados: any) => Promise<void>;
  isLoading: boolean;
}

export function ClienteModal({ 
  aberto, 
  onFechar, 
  cliente, 
  vendedores, 
  onSalvar,
  isLoading 
}: ClienteModalProps) {
  const [abaAtiva, setAbaAtiva] = useState('essencial');
  const { form, onSubmit, abasPreenchidas } = useClienteForm({
    cliente,
    vendedores,
    onSalvar,
    onFechar
  });

  const progressoPercentual = (abasPreenchidas / 3) * 100;

  const handleTabChange = (value: string) => {
    setAbaAtiva(value);
  };

  return (
    <Dialog open={aberto} onOpenChange={onFechar}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            {cliente ? '✏️ Editar Cliente' : '➕ Cadastrar Novo Cliente'}
          </DialogTitle>
          
          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Progresso: {abasPreenchidas} de 3 abas preenchidas
              </span>
              <span className="font-medium">{Math.round(progressoPercentual)}%</span>
            </div>
            <Progress value={progressoPercentual} className="h-2" />
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={abaAtiva} onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="essencial" className="gap-2">
                📋 Essenciais
              </TabsTrigger>
              <TabsTrigger value="endereco" className="gap-2">
                📍 Endereço
              </TabsTrigger>
              <TabsTrigger value="config" className="gap-2">
                ⚙️ Config
              </TabsTrigger>
            </TabsList>

            <TabsContent value="essencial" className="space-y-4 mt-6">
              <ClienteFormEssencial form={form} />
            </TabsContent>

            <TabsContent value="endereco" className="space-y-4 mt-6">
              <ClienteFormEndereco form={form} />
            </TabsContent>

            <TabsContent value="config" className="space-y-4 mt-6">
              <ClienteFormConfig form={form} vendedores={vendedores} />
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onFechar}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Salvando...' : cliente ? 'Atualizar Cliente' : 'Salvar Cliente'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
