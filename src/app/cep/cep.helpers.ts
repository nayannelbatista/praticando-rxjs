import { RespostaCep } from "./resposta-cep.model";

export type ChaveMensagemCep = 'CEP_INVALIDO' | 'CEP_NAO_ENCONTRADO' | 'ERRO_BUSCA';

export const MensagensCep: Record<ChaveMensagemCep, string> = {
  CEP_INVALIDO: 'Digite um CEP válido',
  CEP_NAO_ENCONTRADO: 'CEP não encontrado',
  ERRO_BUSCA: 'Erro ao buscar o CEP',
};

export function criarErro(chave: ChaveMensagemCep): RespostaCep {
  return {
    erro: true,
    mensagem: MensagensCep[chave],
    carregando: false,
  };
}

export function sanitizarCep(cep: string | null | undefined): string {
  return cep?.replace(/\D/g, '') ?? '';
}

export function isCepValido(cep: string): boolean {
  return !!cep && cep.length === 8;
}


