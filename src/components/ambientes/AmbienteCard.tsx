
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Ambiente } from '@/types/ambiente';

interface AmbienteCardProps {
  ambiente: Ambiente;
  onRemover: (id: string) => void;
}

export function AmbienteCard({ ambiente, onRemover }: AmbienteCardProps) {
  const [expandido, setExpandido] = useState(false);

  const resumoAcabamentos = ambiente.acabamentos.slice(0, 2).map(a => a.tipo).join(', ');
  const temMaisAcabamentos = ambiente.acabamentos.length > 2;

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{ambiente.nome}</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-green-600">
              {ambiente.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemover(ambiente.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {resumoAcabamentos}
                {temMaisAcabamentos && ` +${ambiente.acabamentos.length - 2} mais`}
              </span>
              <Badge variant="secondary">
                {ambiente.acabamentos.length} acabamento{ambiente.acabamentos.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandido(!expandido)}
            >
              {expandido ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" />
                  Recolher
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Ver Detalhes
                </>
              )}
            </Button>
          </div>

          {expandido && (
            <div className="mt-4 space-y-3 border-t pt-3">
              {ambiente.acabamentos.map((acabamento) => (
                <div key={acabamento.id} className="bg-muted/30 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{acabamento.tipo}</h4>
                    <span className="font-semibold text-green-600">
                      {acabamento.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Cor:</span> {acabamento.cor}
                    </div>
                    <div>
                      <span className="font-medium">Espessura:</span> {acabamento.espessura}
                    </div>
                    <div>
                      <span className="font-medium">Material:</span> {acabamento.material}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
