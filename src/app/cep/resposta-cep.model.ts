export interface RespostaCep {
  cep?: string;
  logradouro?: string;
  bairro?: string;
  localidade?: string;
  uf?: string;
  estado?: string;
  erro: boolean,
  mensagem: string,
  carregando: boolean,
}




