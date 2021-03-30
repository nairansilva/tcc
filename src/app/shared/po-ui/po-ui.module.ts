import { ShowMoreButtonComponent } from './../componentes/show-more-button/show-more-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { ModalCrudComponent } from '../componentes/modal-crud/modal-crud.component';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';




@NgModule({
  declarations: [ShowMoreButtonComponent, ModalCrudComponent],
  imports: [
    CommonModule,
    FormsModule,
    PoModule,
    ReactiveFormsModule,
    PoPageDynamicSearchModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    ShowMoreButtonComponent,
    ModalCrudComponent
  ]
})
export class PoUiModule { }
