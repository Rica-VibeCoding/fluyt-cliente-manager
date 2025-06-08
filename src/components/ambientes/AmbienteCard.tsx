
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
      <div className="border-b border-border/40">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between py-2 px-3 hover:bg-muted/20 cursor-pointer transition-colors group">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                {expandido ? (
                  <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  {ambiente.nome}
                </span>
              </div>
              <Badge 
                variant="outline" 
                className="text-xs px-1.5 py-0 h-5 bg-transparent border-muted-foreground/30 text-muted-foreground"
              >
                {ambiente.acabamentos.length}
              </Badge>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
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
                className="text-muted-foreground hover:text-destructive h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="bg-muted/10 border-t border-border/30">
            <div className="px-3 py-1.5">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/20 hover:bg-transparent">
                    <TableHead className="h-7 text-xs font-medium text-muted-foreground py-1">Tipo</TableHead>
                    <TableHead className="h-7 text-xs font-medium text-muted-foreground py-1">Cor</TableHead>
                    <TableHead className="h-7 text-xs font-medium text-muted-foreground py-1">Material</TableHead>
                    <TableHead className="h-7 text-xs font-medium text-muted-foreground py-1">Espessura</TableHead>
                    <TableHead className="h-7 text-xs font-medium text-muted-foreground text-right py-1">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ambiente.acabamentos.map((acabamento) => (
                    <TableRow key={acabamento.id} className="border-b-0 hover:bg-muted/10">
                      <TableCell className="py-1 text-xs font-medium">
                        {acabamento.tipo}
                      </TableCell>
                      <TableCell className="py-1 text-xs text-muted-foreground">
                        {acabamento.cor}
                      </TableCell>
                      <TableCell className="py-1 text-xs text-muted-foreground">
                        {acabamento.material}
                      </TableCell>
                      <TableCell className="py-1 text-xs text-muted-foreground">
                        {acabamento.espessura}
                      </TableCell>
                      <TableCell className="py-1 text-xs text-right font-medium tabular-nums">
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
