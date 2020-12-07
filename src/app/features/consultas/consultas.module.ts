import { DadosConsultaComponent } from './dadosConsulta/dadosConsulta.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoUiModule } from './../../shared/po-ui/po-ui.module';
import { ConsultasComponent } from './consultas.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MostrarConsultaComponent } from './mostrar-consulta/mostrar-consulta.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultasComponent
  },
];

@NgModule({
  declarations: [ConsultasComponent, MostrarConsultaComponent, DadosConsultaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoUiModule,
    RouterModule.forChild(routes)
  ]
})
export class ConsultasModule { }
