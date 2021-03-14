import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public menus: Array<PoMenuItem>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menus = this.defineMenu();
  }

  defineMenu(): Array<PoMenuItem> {
    return [
      {
        label: 'Home', action: () => {
          this.router.navigate(['']);
        }, icon: 'po-icon-home',
        shortLabel: 'Home',
      },
      {
        label: 'Consultas', link: 'notifications', icon: 'po-icon-calendar',
        shortLabel: 'Consultas',
        subItems: [
          {
            label: 'Agendar Consultas', action: () => {
              this.router.navigate(['consultas']);
            }, shortLabel: 'Agendar', icon: 'po-icon-clock'
          },
          {
            label: 'Atendimentos', action: () => {
              this.router.navigate(['atendimentos']);
            }, shortLabel: 'Atendimento', icon: 'po-icon-clock'
          },
          {
            label: 'Prontuários', action: () => {
              this.router.navigate(['consultas']);
            }, shortLabel: 'Agendar', icon: 'po-icon-clock'
          }
        ]
      },
      {
        label: 'Prontuários', link: 'customers', icon: 'po-icon-clipboard',
        shortLabel: 'Prontuários',
      },
    ];
  }

}
