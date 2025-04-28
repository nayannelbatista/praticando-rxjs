import { Component } from '@angular/core';

import { BuscaCepComponent } from './cep/busca-cep/busca-cep.component';

@Component({
  selector: 'app-root',
  imports: [BuscaCepComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'buscadorCep';
}
