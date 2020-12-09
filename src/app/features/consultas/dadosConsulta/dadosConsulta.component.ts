import { Pessoa } from './../../../shared/interfaces/pessoa.model';
import { PacientesService } from './../../../shared/services/pacientes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoComboOption } from '@po-ui/ng-components';

@Component({
  selector: 'app-dadosConsulta',
  templateUrl: './dadosConsulta.component.html',
  styleUrls: ['./dadosConsulta.component.css']
})
export class DadosConsultaComponent implements OnInit {

  public pacientes: Array<PoComboOption>;
  public carregando = false;
  public formAgendarConsulta: FormGroup;
  public bodyFilter = {
    dataAtendimento: '',
    horaAtendimento: '',
    idPaciente: '',
    procedimento: '',
    nomePaciente: '',
    dataNascimentoPaciente: '',
    documentoPaciente: '',
    emailPaciente: '',
    idFuncionario: '',
    nomeFuncionario: '',
    dataNascimentoFuncionario: '',
    documentoFuncionario: '',
    emailFuncionario: '',
  };

  constructor(private formBuilder: FormBuilder, private pacientesService: PacientesService) { }

  ngOnInit(): void {
    this.getPacientes();
    this.buildForm();
  }

  getPacientes(): any {
    this.pacientesService.getPacientes().subscribe(retornoPacientes => {
      this.pacientes = retornoPacientes.map(paciente => {
        return { label: paciente.nome, value: paciente.id }
      });
      this.carregando = true;
    },
      (erro) => alert(erro));
  }

  selecionaCliente(idPaciente): void {
    console.log(idPaciente);
    alert('aaaa')
  }

  buildForm(): void {
    this.formAgendarConsulta = this.formBuilder.group({
      dataAtendimento: [this.bodyFilter.dataAtendimento],
      horaAtendimento: [this.bodyFilter.horaAtendimento],
      procedimento: [this.bodyFilter.procedimento],
      idPaciente: [this.bodyFilter.idPaciente],
      nomePaciente: [this.bodyFilter.nomePaciente],
      dataNascimentoPaciente: [this.bodyFilter.dataNascimentoPaciente],
      documentoPaciente: [this.bodyFilter.documentoPaciente],
      emailPaciente: [this.bodyFilter.emailPaciente],
      idFuncionario: [this.bodyFilter.idFuncionario],
      nomeFuncionario: [this.bodyFilter.nomeFuncionario],
      dataNascimentoFuncionario: [this.bodyFilter.dataNascimentoFuncionario],
      documentoFuncionario: [this.bodyFilter.documentoFuncionario],
      emailFuncionario: [this.bodyFilter.emailFuncionario],
    });
  }

}
