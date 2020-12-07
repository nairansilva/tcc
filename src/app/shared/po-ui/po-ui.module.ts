import { ShowMoreButtonComponent } from './../componentes/show-more-button/show-more-button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';



@NgModule({
  declarations: [ShowMoreButtonComponent],
  imports: [
    CommonModule,
    FormsModule,
    PoModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    PoModule,
    ShowMoreButtonComponent
  ]
})
export class PoUiModule { }
