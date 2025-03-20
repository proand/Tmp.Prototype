import { Component, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutRoot } from '@app/shared/view-state/view-state.models';
import { LayoutMenuItemComponent } from '../layout-menu-item/layout-menu-item.component';

@Component({
  selector: 'app-layout-menu',
  imports: [SharedModule, LayoutMenuItemComponent],
  templateUrl: './layout-menu.component.html',
  styleUrl: './layout-menu.component.scss',
})
export class LayoutMenuComponent {
  layouts = input.required<LayoutRoot[]>();
}
