
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { ESTADOS_BRASIL } from '@/types/cliente';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ClienteFormEnderecoProps {
  form: UseFormReturn<any>;
}

export function ClienteFormEndereco({ form }: ClienteFormEnderecoProps) {
  const [buscandoCEP, setBuscandoCEP] = useState(false);
  const { toast } = useToast();

  const buscarCEP = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '');
    
    if (cepLimpo.length !== 8) return;

    setBuscandoCEP(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP informado e tente novamente.",
          variant: "destructive"
        });
        return;
      }

      // Preencher campos automaticamente
      form.setValue('logradouro', data.logradouro || '');
      form.setValue('bairro', data.bairro || '');
      form.setValue('cidade', data.localidade || '');
      form.setValue('uf', data.uf || 'SP');

      toast({
        title: "CEP encontrado!",
        description: "Endereço preenchido automaticamente.",
      });
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive"
      });
    } finally {
      setBuscandoCEP(false);
    }
  };

  const formatarCEP = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP *</FormLabel>
              <FormControl>
                <Input 
                  placeholder="00000-000"
                  {...field}
                  onChange={(e) => {
                    const formatted = formatarCEP(e.target.value);
                    field.onChange(formatted);
                    
                    // Buscar automaticamente quando CEP estiver completo
                    if (formatted.length === 9) {
                      buscarCEP(formatted);
                    }
                  }}
                  disabled={buscandoCEP}
                />
              </FormControl>
              {buscandoCEP && (
                <p className="text-xs text-muted-foreground">Buscando CEP...</p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="numero"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input placeholder="123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logradouro"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Logradouro *</FormLabel>
              <FormControl>
                <Input placeholder="Rua, Avenida, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="complemento"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input placeholder="Apto, Bloco, Sala, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bairro"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro *</FormLabel>
              <FormControl>
                <Input placeholder="Nome do bairro" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade *</FormLabel>
              <FormControl>
                <Input placeholder="Nome da cidade" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="uf"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Estado (UF) *</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {ESTADOS_BRASIL.map(uf => (
                    <SelectItem key={uf} value={uf}>
                      {uf}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
