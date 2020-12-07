import { Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { PoModalComponent, PoModalAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-mostrar-consulta',
  templateUrl: './mostrar-consulta.component.html',
  styleUrls: ['./mostrar-consulta.component.css']
})
export class MostrarConsultaComponent implements OnInit {
  @Input() agendasReservadas: Array<any>;
  @Input() loadingTable;
  @Output() consultaSelecionada = new EventEmitter();

  public columns: Array<PoTableColumn>;
  public actions: Array<PoTableAction> = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.agendasReservadas);
    this.columns = this.getColumns();
    this.actions = this.getActions();
  }

  getActions(): Array<PoTableAction> {
    return [
      {
        action: this.openQuestionnaire.bind(this),
        icon: 'po-icon-eye',
        label: 'Visualizar'
      },
      {
        action: () => alert('editar'),
        icon: 'po-icon-edit',
        label: 'Editar',
      },
      {
        action: () => alert('Excluir'),
        icon: 'po-icon-delete',
        label: 'Deletar'
      }
    ];
  }
  openQuestionnaire(itemSelecionado): void {
    this.consultaSelecionada.emit({ tipo: 1, item: itemSelecionado });
  }

  getColumns(): Array<PoTableColumn> {
    return [
      {
        property: 'status',
        type: 'subtitle',
        width: '8%',
        label: 'Status',
        subtitles: [
          { value: 1, color: 'color-03', label: 'Marcada', content: 'M' },
          { value: 2, color: 'color-10', label: 'Realizada', content: 'R' },
          { value: 3, color: 'color-07', label: 'Ausente', content: 'A' },
        ],
      },
      { property: 'idPaciente', label: 'Paciente', type: 'number' },
      { property: 'nomePaciente', label: 'Nome Paciente', type: 'string' },
      { property: 'dataHoraAtendimento', label: 'Data', type: 'dateTime' },
      { property: 'descricao', label: 'Descrição', type: 'string' },
      { property: 'idFuncionario', label: 'Funcionário', type: 'number' },
      { property: 'nomeFuncionario', label: 'Nome Funcionário', type: 'string' },

    ];
  }

  getItems(): Array<any> {
    return [
      {
        statusAtendimento: 1,
        paciente: '000001',
        nomePaciente: 'Nairan Alves Silva',
        dataAtendimento: new Date(),
        tipo: 'Ortopedista',
        descricao: 'Problema no Joelho',
        funcionario: '000001',
        nomeFuncionario: 'Funcionário Teste'
      }, {
        statusAtendimento: 3,
        paciente: '000001',
        nomePaciente: 'Nairan Alves Silva',
        dataAtendimento: new Date(),
        tipo: 'Ortopedista',
        descricao: 'Problema no Joelho',
        funcionario: '000001',
        nomeFuncionario: 'Funcionário Teste'
      }, {
        statusAtendimento: 2,
        paciente: '000001',
        nomePaciente: 'Nairan Alves Silva',
        dataAtendimento: new Date(),
        tipo: 'Ortopedista',
        descricao: 'Problema no Joelho',
        funcionario: '000001',
        nomeFuncionario: 'Funcionário Teste'
      }, {
        statusAtendimento: 1,
        paciente: '000001',
        nomePaciente: 'Nairan Alves Silva',
        dataAtendimento: new Date(),
        tipo: 'Ortopedista',
        descricao: 'Problema no Joelho',
        funcionario: '000001',
        nomeFuncionario: 'Funcionário Teste'
      }, {
        statusAtendimento: 1,
        paciente: '000001',
        nomePaciente: 'Nairan Alves Silva',
        dataAtendimento: new Date(),
        tipo: 'Ortopedista',
        descricao: 'Problema no Joelho',
        funcionario: '000001',
        nomeFuncionario: 'Funcionário Teste'
      }, {
        statusAtendimento: 2,
        paciente: '000001',
        nomePaciente: 'Nairan Alves Silva',
        dataAtendimento: new Date(),
        tipo: 'Ortopedista',
        descricao: 'Problema no Joelho',
        funcionario: '000001',
        nomeFuncionario: 'Funcionário Teste'
      }, {
        statusAtendimento: 2,
        paciente: '000001',
        nomePaciente: 'Nairan Alves Silva',
        dataAtendimento: new Date(),
        tipo: 'Ortopedista',
        descricao: 'Problema no Joelho',
        funcionario: '000001',
        nomeFuncionario: 'Funcionário Teste'
      }, {
        statusAtendimento: 3,
        paciente: '000001',
        nomePaciente: 'Nairan Alves Silva',
        dataAtendimento: new Date(),
        tipo: 'Ortopedista',
        descricao: 'Problema no Joelho',
        funcionario: '000001',
        nomeFuncionario: 'Funcionário Teste'
      }, {
        statusAtendimento: 2,
        paciente: '000001',
        nomePaciente: 'Nairan Alves Silva',
        dataAtendimento: new Date(),
        tipo: 'Ortopedista',
        descricao: 'Problema no Joelho',
        funcionario: '000001',
        nomeFuncionario: 'Funcionário Teste'
      }, {
        statusAtendimento: 3,
        paciente: '000001',
        nomePaciente: 'Nairan Alves Silva',
        dataAtendimento: new Date(),
        tipo: 'Ortopedista',
        descricao: 'Problema no Joelho',
        funcionario: '000001',
        nomeFuncionario: 'Funcionário Teste'
      },
    ]
  }
}
