import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PoUiModule } from '../shared/po-ui/po-ui.module';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { MenuModule } from './menu/menu.module';


@NgModule({
  declarations: [ToolbarComponent, MenuComponent, HomeComponent],
  imports: [
    CommonModule,
    PoUiModule,
    RouterModule,
    MenuModule
  ],
  exports: [ToolbarComponent, MenuComponent]
})
export class CoreModule { }
