import { Component, inject, OnInit } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { GisbasViewId as viewId } from '@GISBAS_CONNECT/gisbas-view-id.enum';

import { mainMenuItems, getViewMenuItemName } from './menu-items.data';
import { MenuItem } from './menu-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  imports: [SharedModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent implements OnInit {
  private router = inject(Router);

  mainMenuItems = mainMenuItems;
  subMenuItems: MenuItem[] = [];

  ngOnInit() {
    this.subMenuItems = mainMenuItems.find(
      (item) => item.name === getViewMenuItemName(viewId.Prototype),
    )?.children as MenuItem[];
  }

  navigate(routerLink: string) {
    this.router.navigate([routerLink], { skipLocationChange: true });

    // DEBUGGING
    // this.router.navigate([routerLink]);
  }
}
