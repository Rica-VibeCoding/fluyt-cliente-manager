
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
      <div className="border-b border-border/20">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between py-1.5 px-4 hover:bg-muted/10 cursor-pointer transition-colors group">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                {expandido ? (
                  <ChevronUp className="h-3 w-3 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-3 w-3 text-muted-foreground" />
                )}
                <span className="font-medium text-sm text-foreground truncate">
                  {ambiente.nome}
                </span>
                <Badge 
                  variant="outline" 
                  className="text-xs px-1.5 py-0 h-4 bg-transparent border-muted-foreground/20 text-muted-foreground"
                >
                  {ambiente.acabamentos.length}
                </Badge>
              </div>
            </div>
            
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-semibold text-sm text-foreground tabular-nums">
                {ambiente.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemover(ambiente.id);
                }}
                className="text-muted-foreground hover:text-destructive h-5 w-5 p-0 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="bg-muted/5 border-t border-border/10">
            <div className="px-4 py-1">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/10 hover:bg-transparent">
                    <TableHead className="h-6 text-xs font-medium text-muted-foreground py-0.5">Tipo</TableHead>
                    <TableHead className="h-6 text-xs font-medium text-muted-foreground py-0.5">Cor</TableHead>
                    <TableHead className="h-6 text-xs font-medium text-muted-foreground py-0.5">Material</TableHead>
                    <TableHead className="h-6 text-xs font-medium text-muted-foreground py-0.5">Espessura</TableHead>
                    <TableHead className="h-6 text-xs font-medium text-muted-foreground text-right py-0.5">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ambiente.acabamentos.map((acabamento) => (
                    <TableRow key={acabamento.id} className="border-b-0 hover:bg-muted/5">
                      <TableCell className="py-0.5 text-xs font-medium h-6">
                        {acabamento.tipo}
                      </TableCell>
                      <TableCell className="py-0.5 text-xs text-muted-foreground h-6">
                        {acabamento.cor}
                      </TableCell>
                      <TableCell className="py-0.5 text-xs text-muted-foreground h-6">
                        {acabamento.material}
                      </TableCell>
                      <TableCell className="py-0.5 text-xs text-muted-foreground h-6">
                        {acabamento.espessura}
                      </TableCell>
                      <TableCell className="py-0.5 text-xs text-right font-medium tabular-nums h-6">
                        {acabamento.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
