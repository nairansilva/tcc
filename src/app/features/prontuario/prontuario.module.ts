import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProntuarioComponent } from './prontuario/prontuario.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoUiModule } from 'src/app/shared/po-ui/po-ui.module';

const routes: Routes = [
  {
    path: '',
    component: ProntuarioComponent
  },
];

@NgModule({
  declarations: [ProntuarioComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoUiModule,
    RouterModule.forChild(routes)
  ]
})
export class ProntuarioModule { }
