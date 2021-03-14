import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'consultas',
        loadChildren: () =>
          import('../../features/consultas/consultas.module').then(
            (m) => m.ConsultasModule
          ),
      },
      {
        path: 'atendimentos',
        loadChildren: () =>
          import('../../features/atendimento/atendimento.module').then(
            (m) => m.AtendimentoModule
          ),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
