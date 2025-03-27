import { Component, inject, OnInit } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { NavigationService } from '@app/shared/navigation.service';
import { GisbasViewId as viewId } from '@GISBAS_CONNECT/gisbas-view-id.enum';
import { mainMenuItems, getViewMenuItemName } from './menu-items.data';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'app-main-menu',
  imports: [SharedModule],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent implements OnInit {
  private navigationService = inject(NavigationService);

  mainMenuItems = mainMenuItems;
  subMenuItems: MenuItem[] = [];

  ngOnInit() {
    this.subMenuItems = mainMenuItems.find(
      (item) => item.name === getViewMenuItemName(viewId.Prototype),
    )?.children as MenuItem[];
  }

  navigate(gisbasComponentId: number) {
    this.navigationService.navigate(gisbasComponentId);
  }

  navigateToView(viewId: number) {
    this.navigationService.navigateToView(viewId);
  }
}
