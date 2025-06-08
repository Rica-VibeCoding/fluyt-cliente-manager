
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
      <div className="border-b border-border/60">
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between py-3 px-4 hover:bg-muted/30 cursor-pointer transition-all duration-200 group">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {expandido ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground transition-transform" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform" />
                )}
                <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                  {ambiente.nome}
                </span>
              </div>
              <Badge 
                variant="secondary" 
                className="text-xs px-2 py-0.5 bg-muted/80 text-muted-foreground border-0"
              >
                {ambiente.acabamentos.length} item{ambiente.acabamentos.length !== 1 ? 's' : ''}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="font-semibold text-foreground tabular-nums">
                {ambiente.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemover(ambiente.id);
                }}
                className="text-muted-foreground hover:text-destructive h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="bg-muted/20 border-t border-border/40">
            <div className="px-4 py-2">
              <div className="text-xs text-muted-foreground mb-2 font-medium">Acabamentos:</div>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-border/30">
                    <TableHead className="h-8 text-xs font-medium text-muted-foreground">Tipo</TableHead>
                    <TableHead className="h-8 text-xs font-medium text-muted-foreground">Cor</TableHead>
                    <TableHead className="h-8 text-xs font-medium text-muted-foreground">Material</TableHead>
                    <TableHead className="h-8 text-xs font-medium text-muted-foreground">Espessura</TableHead>
                    <TableHead className="h-8 text-xs font-medium text-muted-foreground text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ambiente.acabamentos.map((acabamento) => (
                    <TableRow key={acabamento.id} className="border-b-0 hover:bg-muted/20">
                      <TableCell className="py-2 text-sm">
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
                      <TableCell className="py-2 text-sm text-right font-medium tabular-nums">
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
