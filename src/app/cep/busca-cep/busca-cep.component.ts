import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';

import { CepService } from '../cep.service';
import { debounceTime, distinctUntilChanged, map, switchMap, startWith, of, Observable } from 'rxjs';
import { RespostaCep } from '../resposta-cep.model';
import { sanitizarCep, isCepValido, criarErro } from '../cep.helpers';

@Component({
  selector: 'app-busca-cep',
  imports: [
    CommonModule,
    MatCard,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './busca-cep.component.html',
  styleUrl: './busca-cep.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuscaCepComponent {
  private cepService = inject(CepService);

  readonly cepControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{8}$/)
  ]);

  cepResposta$: Observable<RespostaCep> = this.cepControl.valueChanges.pipe(
    debounceTime(500),
    map(sanitizarCep),
    distinctUntilChanged(),
    switchMap(cep => {
      if (!isCepValido(cep)) {
        return of(criarErro('CEP_INVALIDO'));
      }

      return this.cepService.buscarCep(cep).pipe(
        startWith({ carregando: true, erro: false, mensagem: '' })
      );
    }),
  );
}
