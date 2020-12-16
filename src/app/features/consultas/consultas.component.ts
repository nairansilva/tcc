import { PacientesService } from './../../shared/services/pacientes.service';
import { PessoaService } from './../../shared/services/pessoa.service';
import { ConsultaBrowser } from './../../shared/interfaces/consultaBrowser.model';
import { EnumDiasDaSemana } from './../../shared/enum2/enums';
import { Observable } from 'rxjs/internal/Observable';
import { AgendaService } from './../../shared/services/agenda.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, finalize } from 'rxjs/operators';
import { PoModalAction, PoModalComponent, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { ModalCrudComponent } from 'src/app/shared/componentes/modal-crud/modal-crud.component';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit, OnDestroy {
  public formulario;
  public searchField = new FormControl();
  public searchSchedule: FormGroup = this.formBuilder.group({
    search: [''],
  });
  private agendasSubscription: Subscription;
  private defineDiasSemana = EnumDiasDaSemana;
  private agendasSearch: ConsultaBrowser[];
  private page: number;
  public agendasReservadas: ConsultaBrowser[] = [];
  public hasNext = false;
  public loadingTable = true;
  public actions: Array<PoPageAction>;
  public opcaoModal;
  public descricaoAcao = '';

  constructor(private formBuilder: FormBuilder,
    private agenda: AgendaService,
    private poNotification: PoNotificationService
  ) { }

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @ViewChild(ModalCrudComponent, { static: true }) modalCrud: ModalCrudComponent;

  ngOnInit(): void {
    this.changeInput();
    this.getItems();
    this.actions = this.defineActions();
  }

  defineActions(): Array<PoPageAction> {
    return [
      {
        label: 'Agendar',
        action: this.incluirConsulta.bind(this),
        icon: 'po-icon-plus-circle',
      },
    ];
  }

  getItems(page = 1, limit = 10, search = ''): void {
    this.page = page;
    this.loadingTable = true;
    this.agendasSubscription = this.agenda.getConsultasBrowser(this.page, limit)
      .pipe(finalize(() => this.loadingTable = false))
      .subscribe(agendasEncontradas => {
        console.log(agendasEncontradas),
          this.agendasSearch = agendasEncontradas.map(agendas => (
            {
              ...agendas, diaDaSemana: this.defineDiasSemana[agendas.diaDaSemana]
            })
          );
        if (search) {
          this.agendasReservadas = this.agendasReservadas.concat(
            this.agendasSearch.filter(agenda => agenda.nomePaciente.toLowerCase().includes(search))
          );
          this.agendasReservadas = this.agendasReservadas.concat(this.agendasSearch.filter(agendas => {
            return agendas.nomeFuncionario.toLowerCase().includes(search);
          }));
        } else {
          this.agendasSearch.length >= 10 ? this.hasNext = true : this.hasNext = false;
          this.agendasReservadas = this.agendasReservadas.concat(this.agendasSearch);
        }
      });
  }

  changeInput(): void {
    this.searchSchedule.valueChanges.pipe(debounceTime(700)).subscribe(
      (searchForm) => {
        const searchInputValue = searchForm.search;
        if (
          searchInputValue != null &&
          (searchInputValue.length >= 3 || searchInputValue.length === 0)
        ) {
          this.validEmptySearch(searchInputValue.toLowerCase());
        }
      },
      (error) => {
        this.poNotification.error(
          'Erro ao realizar a busca: ' + error
        );
      }
    );
  }

  showMore(): void {
    this.getItems(this.page + 1);
  }

  validEmptySearch(search: string): void {
    this.agendasReservadas = [];
    if (search) {
      this.getItems(1, 999999, search);
    } else {
      this.getItems();
    }
  }

  incluirConsulta(): void {
    this.opcaoModal = { item: {}, tipo: 4 };
    this.defineNomeAcao(4);
    //this.abrirModal()
    this.poModal.open();
  }

  consultaSelecionada(event): void {
    this.defineNomeAcao(event.tipo);
    this.opcaoModal = event;
    this.poModal.open();
  }

  defineNomeAcao(tipo): void {
    switch (tipo) {
      case 1: {
        this.descricaoAcao = 'Visualizar Consulta'
        break;
      }
      case 2: {
        this.descricaoAcao = 'Alterar Consulta'
        break;
      }
      case 4: {
        this.descricaoAcao = 'Incluir Consulta'
        break;
      }
      default: {
        this.descricaoAcao = 'Excluir Consulta'
        break;
      }
    }
  }

  abrirModal(): void {
    this.modalCrud.openRightMenu();
  }

  recebeFormulario(form):void {
    this.formulario = form;
  }

  confirm: PoModalAction = {
    action: () => {
      console.log('recebi formulario', this.formulario)
      alert('teste');
    },
    label: 'Confirmar'
  };

  ngOnDestroy(): void {
    this.agendasSubscription.unsubscribe();
  }
}
