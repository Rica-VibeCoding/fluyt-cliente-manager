
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Plus, Home, Upload, ArrowLeft, User } from 'lucide-react';
import { useAmbientes } from '@/hooks/useAmbientes';
import { AmbienteModal } from './AmbienteModal';
import { AmbienteCard } from './AmbienteCard';
import { Link } from 'react-router-dom';

export function AmbientePage() {
  const [searchParams] = useSearchParams();
  const clienteId = searchParams.get('clienteId');
  const clienteNome = searchParams.get('clienteNome');
  
  const { ambientes, adicionarAmbiente, removerAmbiente, importarXML, isLoading, valorTotalGeral } = useAmbientes(clienteId || undefined);
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-400 bg-clip-text text-transparent flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl shadow-sm">
                  <Home className="h-8 w-8 text-white" />
                </div>
                Ambientes do Orçamento
              </h1>
              {clienteNome ? (
                <div className="flex items-center gap-2 mt-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground font-medium">
                    Cliente: <span className="font-semibold text-foreground">{decodeURIComponent(clienteNome)}</span>
                  </p>
                </div>
              ) : (
                <p className="text-lg text-muted-foreground font-medium">
                  Selecione um cliente para gerenciar os ambientes
                </p>
              )}
              <p className="text-base text-muted-foreground">
                Gerencie os ambientes e acabamentos do orçamento
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={importarXML}
            disabled={isLoading || !clienteId}
            variant="outline"
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {isLoading ? 'Importando...' : 'Importar XML'}
          </Button>
          
          <Button 
            onClick={() => setModalAberto(true)} 
            className="gap-2"
            disabled={!clienteId}
          >
            <Plus className="h-4 w-4" />
            Novo Ambiente
          </Button>
        </div>
      </div>

      {/* Aviso se não há cliente selecionado */}
      {!clienteId && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-amber-600" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200">
                  Nenhum cliente selecionado
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Para criar ambientes, acesse a lista de clientes e clique em "Criar Ambientes" no menu de ações.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Total de Ambientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ambientes.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Valor Total Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {valorTotalGeral.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">Ações</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              disabled={ambientes.length === 0}
            >
              <Download className="h-4 w-4 mr-2" />
              Exportar PDF
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Ambientes */}
      {clienteId && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Ambientes Cadastrados</h2>
          
          {ambientes.length === 0 ? (
            <Card className="p-8">
              <div className="text-center text-muted-foreground">
                <Home className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Nenhum ambiente cadastrado</p>
                <p>Comece importando um XML ou criando um ambiente manualmente</p>
              </div>
            </Card>
          ) : (
            <div className="grid gap-4">
              {ambientes.map((ambiente) => (
                <AmbienteCard
                  key={ambiente.id}
                  ambiente={ambiente}
                  onRemover={removerAmbiente}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      <AmbienteModal
        open={modalAberto}
        onOpenChange={setModalAberto}
        onSubmit={adicionarAmbiente}
      />
    </div>
  );
}
