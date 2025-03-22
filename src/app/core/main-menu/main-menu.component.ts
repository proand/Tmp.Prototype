import { Component, inject, OnInit } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { GisbasSectionId as SectionId } from '@GISBAS_CONNECT/gisbas-section-id.enum';

import { mainMenuItems, getSectionMenuItemName } from './menu-items.data';
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
  sectionSubMenuItems: MenuItem[] = [];

  ngOnInit() {
    this.sectionSubMenuItems = mainMenuItems.find(
      (item) => item.name === getSectionMenuItemName(SectionId.Prototype),
    )?.children as MenuItem[];
  }

  navigate(routerLink: string) {
    this.router.navigate([routerLink], { skipLocationChange: true });
  }
}
