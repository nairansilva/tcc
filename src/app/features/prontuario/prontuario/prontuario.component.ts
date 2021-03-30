import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.css']
})
export class ProntuarioComponent implements OnInit {

  public formAgendarConsulta: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm(): void {
    this.formAgendarConsulta = this.formBuilder.group({
      codPaciente: ["000001"],
      nomePaciente:["João da Silva"],
      codMedico: ["000555"],
      nomeMedico: ["Sandra Sabonette"],
      procedimento: ["Oftalmologista"],
      retorno: [2],
      internacao: [2],
      medicamentos: ["Colírio XTPO de 3 em 3 horas"],
      observacao: ["Não há"],
    });
  }
}
