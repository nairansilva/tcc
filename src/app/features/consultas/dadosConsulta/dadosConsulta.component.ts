import { FuncionariosService } from './../../../shared/services/funcionarios.service';
import { ProcedimentosService } from './../../../shared/services/procedimentos.service';
import { AcoesConsulta } from './../../../shared/interfaces/acoesConsulta.model';
import { Pessoa } from './../../../shared/interfaces/pessoa.model';
import { PacientesService } from './../../../shared/services/pacientes.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoComboOption } from '@po-ui/ng-components';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-dadosConsulta',
  templateUrl: './dadosConsulta.component.html',
  styleUrls: ['./dadosConsulta.component.css']
})
export class DadosConsultaComponent implements OnInit {
  public tipoOperacao;
  public habilitaMedico = true;
  @Input() set opcaoModal(opcao: AcoesConsulta) {
    if (opcao) {
      this.tipoOperacao = opcao.tipo;
      if (this.tipoOperacao === 1) {
        this.mostraConsulta(opcao.item)
      } else if (this.tipoOperacao === 4) {
        this.resetForm()
      }
    }
  };
  public pacientes: Array<PoComboOption>;
  public datasCombo: Array<PoComboOption>;
  public horasCombo: Array<PoComboOption>;
  public procedimentos: Array<PoComboOption>;
  public medicosCombo: Array<PoComboOption>;
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
    descricaoAtendimento: ''
  };

  constructor(private formBuilder: FormBuilder,
    private pacientesService: PacientesService,
    private procedimentosService: ProcedimentosService,
    private funcionariosService: FuncionariosService) { }

  ngOnInit(): void {
    this.getPacientes();
    this.buildForm();
    this.getProcedimentos();
  }

  getPacientes(): any {
    this.carregando = false;
    this.pacientesService.getPacientes().pipe(
      finalize(() => this.carregando = true
      )
    ).subscribe(retornoPacientes => {
      this.pacientes = retornoPacientes.map(paciente => {
        return { label: `${paciente.id} - ${paciente.nome}`, value: paciente.id }
      });
    },
      (erro) => alert(erro));
  }

  getProcedimentos(): void {
    this.carregando = false;
    this.procedimentosService.getProcedimentos().subscribe(retornoProcedientos => {
      console.log(retornoProcedientos)
      this.procedimentos = retornoProcedientos.map(procedimentosMap => {
        return { label: `${procedimentosMap.id} - ${procedimentosMap.nome}`, value: procedimentosMap.id }
      });
      console.log(this.procedimentos)
      this.carregando = true;
    },
      (erro) => alert(erro));
  }

  mostraConsulta(consulta): void {
    this.formAgendarConsulta.setValue({
      dataAtendimento: consulta.dataAtendimento,
      horaAtendimento: consulta.horaAtendimento,
      procedimento: consulta.procedimento,
      idPaciente: consulta.idPaciente,
      nomePaciente: consulta.nomePaciente,
      dataNascimentoPaciente: consulta.dadosPaciente.dataNascimento,
      documentoPaciente: consulta.dadosPaciente.documentos[0].documento,
      emailPaciente: consulta.dadosPaciente.email,
      idFuncionario: consulta.idFuncionario,
      nomeFuncionario: consulta.dadosFuncionario.nome,
      dataNascimentoFuncionario: consulta.dadosFuncionario.dataNascimento,
      documentoFuncionario: consulta.dadosFuncionario.documentos[0].documento,
      emailFuncionario: consulta.dadosFuncionario.email,
      descricaoAtendimento: consulta.descricao
    })

  }

  selecionaPaciente(idPaciente): void {
    if (idPaciente) {
      this.carregando = false;
      this.pacientesService.getPacienteId(idPaciente).subscribe(paciente => {
        this.montaDadosPaciente(paciente);
        this.carregando = true;
      });
    }
  }

  montaDadosPaciente(dadosPaciente): void {
    console.log(dadosPaciente)
    this.formAgendarConsulta.patchValue({
      idPaciente: dadosPaciente.id,
      nomePaciente: dadosPaciente.nome,
      dataNascimentoPaciente: dadosPaciente.dataNascimento,
      documentoPaciente: dadosPaciente.documentos[0].documento,
      emailPaciente: dadosPaciente.email,
    })
  }

  selecionaProcedimento(procedimentoCombo): void {
    if (procedimentoCombo) {
      this.habilitaMedico = false;
      this.procedimentosService.getFuncionarioProcedimento(procedimentoCombo).subscribe(funcionarioXProcedimento => {
        this.medicosCombo = funcionarioXProcedimento.map(medicos => {
          return { label: `${medicos.id} - ${medicos.nome}`, value: medicos.id }
        });
      })
    } else {
      this.habilitaMedico = true;
    }
  }


  selecionaFuncionario(idFuncionario): void {
    if (idFuncionario) {
      this.carregando = false;
      this.funcionariosService.getFuncionarioId(idFuncionario).subscribe(funcionario => {
        this.montaDadosFuncionario(funcionario);
        this.carregando = true;
      });
    }
  }

  montaDadosFuncionario(dadosFuncionario): void {
    console.log(dadosFuncionario)
    this.formAgendarConsulta.patchValue({
      idFuncionario: dadosFuncionario.id,
      nomeFuncionario: dadosFuncionario.nome,
      dataNascimentoFuncionario: dadosFuncionario.dataNascimento,
      documentoFuncionario: dadosFuncionario.documentos[0].documento,
      emailFuncionario: dadosFuncionario.email,
    })
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
      descricaoAtendimento: [this.bodyFilter.descricaoAtendimento],
    });
  }

  resetForm(): void {
    this.formAgendarConsulta.patchValue({
      dataAtendimento: '',
      horaAtendimento: '',
      procedimento: '',
      idPaciente: '',
      nomePaciente: '',
      dataNascimentoPaciente: '',
      documentoPaciente: '',
      emailPaciente: '',
      idFuncionario: '',
      nomeFuncionario: '',
      dataNascimentoFuncionario: '',
      documentoFuncionario: '',
      emailFuncionario: '',
      descricaoAtendimento: ''
    })
  }
}
