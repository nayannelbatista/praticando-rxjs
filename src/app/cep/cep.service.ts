import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { isCepValido, criarErro } from "./cep.helpers";
import { of, map, catchError } from "rxjs";
import { RespostaCep } from "./resposta-cep.model";

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  buscarCep(cep: string) {
    if (!isCepValido(cep)) {
      return of(criarErro('CEP_INVALIDO'));
    }

    return this.http.get<RespostaCep>(`https://viacep.com.br/ws/${cep}/json`).pipe(
      map(resposta =>
        resposta.erro
          ? criarErro('CEP_NAO_ENCONTRADO')
          : { ...resposta, erro: false, carregando: false, mensagem: '' }
      ),
      catchError(() => of(criarErro('ERRO_BUSCA')))
    );
  }
}
