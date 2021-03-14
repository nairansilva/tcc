import { DadosAtendimentoComponent } from './dadosAtendimento/dadosAtendimento.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtendimentoComponent } from './atendimento.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoUiModule } from 'src/app/shared/po-ui/po-ui.module';

const routes: Routes = [
  {
    path: '',
    component: AtendimentoComponent
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoUiModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AtendimentoComponent,DadosAtendimentoComponent]
})
export class AtendimentoModule { }
