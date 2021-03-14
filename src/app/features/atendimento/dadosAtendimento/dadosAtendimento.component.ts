import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dadosAtendimento',
  templateUrl: './dadosAtendimento.component.html',
  styleUrls: ['./dadosAtendimento.component.scss']
})
export class DadosAtendimentoComponent implements OnInit {
  public formAgendarConsulta: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.formAgendarConsulta = this.formBuilder.group({
      paciente: ["000001 - Padro Pedreira"],
      medico: ["000555 - Sandra Sabonette"],
      procedimento: ["Oftalmologista"],
      retorno: [2],
      internacao: [2],
      medicamentos: ["Colírio XTPO de 3 em 3 horas"],
      observacao: ["Não há"],
    });
  }
}
