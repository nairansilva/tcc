import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PoModalComponent, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';

@Component({
  selector: 'app-atendimento',
  templateUrl: './atendimento.component.html',
  styleUrls: ['./atendimento.component.css']
})
export class AtendimentoComponent implements OnInit {

  public actions: Array<PoPageAction>;
  public columns: Array<PoTableColumn>;
  public actionsTable: Array<PoTableAction> = [];
  public atendimentos: Array<any>;
  public loadingTable = false;
  public searchSchedule: FormGroup = this.formBuilder.group({
    search: [''],
  });

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    //this.actions = this.defineActions();
    this.actionsTable = this.defineActionsTable();
    this.columns = this.defineColumns();
    this.atendimentos = this.defineAtendimentos();
  }

  defineActions(): Array<PoPageAction> {
    return [
      {
        label: 'Agendar',
        action: this.incluirAtendimento.bind(this),
        icon: 'po-icon-plus-circle',
      },
    ];
  }

  incluirAtendimento(): any {
    alert("inclui");
  }

  defineActionsTable(): Array<PoTableAction> {
    return [
      {
        action: () => this.poModal.open(),
        icon: 'po-icon-eye',
        label: 'Visualizar'
      },
      {
        action: () => alert(''),
        icon: 'po-icon-edit',
        label: 'Editar',
      },
      {
        action: () => alert(''),
        icon: 'po-icon-delete',
        label: 'Deletar'
      }
    ];
  }

  defineColumns(): Array<PoTableColumn> {
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
      { property: 'codPaciente', label: 'Cod.Paciente' },
      { property: 'nomePaciente', label: 'Nome Paciente' },
      { property: 'dataAtendimento', label: 'Data Atendimento' },
      { property: 'horaAtendimento', label: 'Hora Atendimento' },
      { property: 'codMedico', label: 'Cod.Médico' },
      { property: 'nomeMedico', label: 'Nome Médico' },
      { property: 'procedimento', label: 'Procedimento' },
    ];
  }

  defineAtendimentos(): Array<any> {
    return [
      {
        codPaciente: '000001',
        nomePaciente: 'Paulo Pedroso',
        dataAtendimento: '01/03/2021',
        horaAtendimento: '07:30',
        codMedico: '000003',
        nomeMedico: "Cleber Crimson",
        procedimento: "Exame Rotina",
        status: 1
      },
      {
        codPaciente: '000067',
        nomePaciente: 'Márcia Marciane',
        dataAtendimento: '01/03/2021',
        horaAtendimento: '07:30',
        codMedico: '000077',
        nomeMedico: "Tomas Tornado",
        procedimento: "Colostomia",
        status: 1
      },
      {
        codPaciente: '006547',
        nomePaciente: 'Nayara Navarro',
        dataAtendimento: '01/03/2021',
        horaAtendimento: '13:30',
        codMedico: '665987',
        nomeMedico: "Leandro Leitoso",
        procedimento: "Exame Rotina",
        status: 2
      },
      {
        codPaciente: '000001',
        nomePaciente: 'Paulo Pedroso',
        dataAtendimento: '05/03/2021',
        horaAtendimento: '15:00',
        codMedico: '000003',
        nomeMedico: "Cleber Crimson",
        procedimento: "Oftalmologista",
        status: 3
      },
      {
        codPaciente: '000555',
        nomePaciente: 'Anderson Andrade',
        dataAtendimento: '11/03/2021',
        horaAtendimento: '11:30',
        codMedico: '000777',
        nomeMedico: "Fábio Farias",
        procedimento: "Exame Rotina",
        status: 1
      },
      {
        codPaciente: '000122',
        nomePaciente: 'Donavan Donato',
        dataAtendimento: '11/03/2021',
        horaAtendimento: '12:45',
        codMedico: '006644',
        nomeMedico: "João Jornada",
        procedimento: "Cardiologista",
        status: 3
      },
      {
        codPaciente: '002236',
        nomePaciente: 'Gustavo Gonotti',
        dataAtendimento: '11/03/2021',
        horaAtendimento: '12:45',
        codMedico: '000003',
        nomeMedico: "Fábio Farias",
        procedimento: "Exame Rotina",
        status: 2
      },
      {
        codPaciente: '009966',
        nomePaciente: 'Sandra Sabonette',
        dataAtendimento: '15/03/2021',
        horaAtendimento: '07:30',
        codMedico: '000551',
        nomeMedico: "Everson Evaristo",
        procedimento: "Cardiologista",
        status: 2
      },
      {
        codPaciente: '236558',
        nomePaciente: 'Rodney Rodrigues',
        dataAtendimento: '15/03/2021',
        horaAtendimento: '09:00',
        codMedico: '023665',
        nomeMedico: "William Wibstrong",
        procedimento: "Ortopedista",
        status: 1
      },
      {
        codPaciente: '000001',
        nomePaciente: 'Paulo Pedroso',
        dataAtendimento: '15/03/2021',
        horaAtendimento: '11:50',
        codMedico: '023665',
        nomeMedico: "William Wibstrong",
        procedimento: "Ortopedista",
        status: 3
      }
    ];
  }

  showMore(): void {
    alert("desce mais")
  }

}
