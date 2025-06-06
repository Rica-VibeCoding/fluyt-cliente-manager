
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Ambiente } from '@/types/ambiente';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface AmbienteCardProps {
  ambiente: Ambiente;
  onRemover: (id: string) => void;
}

export function AmbienteCard({ ambiente, onRemover }: AmbienteCardProps) {
  const [expandido, setExpandido] = useState(false);

  return (
    <Collapsible open={expandido} onOpenChange={setExpandido}>
      <div className="border rounded-lg bg-card">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {expandido ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="font-medium">{ambiente.nome}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {ambiente.acabamentos.length} acabamento{ambiente.acabamentos.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-semibold text-green-600">
                {ambiente.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemover(ambiente.id);
                }}
                className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t bg-muted/20">
            <Table>
              <TableHeader>
                <TableRow className="border-b-0">
                  <TableHead className="h-10 text-xs">Tipo</TableHead>
                  <TableHead className="h-10 text-xs">Cor</TableHead>
                  <TableHead className="h-10 text-xs">Material</TableHead>
                  <TableHead className="h-10 text-xs">Espessura</TableHead>
                  <TableHead className="h-10 text-xs text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ambiente.acabamentos.map((acabamento) => (
                  <TableRow key={acabamento.id} className="border-b-0">
                    <TableCell className="py-2 text-sm font-medium">
                      {acabamento.tipo}
                    </TableCell>
                    <TableCell className="py-2 text-sm text-muted-foreground">
                      {acabamento.cor}
                    </TableCell>
                    <TableCell className="py-2 text-sm text-muted-foreground">
                      {acabamento.material}
                    </TableCell>
                    <TableCell className="py-2 text-sm text-muted-foreground">
                      {acabamento.espessura}
                    </TableCell>
                    <TableCell className="py-2 text-sm text-right text-green-600 font-medium">
                      {acabamento.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
