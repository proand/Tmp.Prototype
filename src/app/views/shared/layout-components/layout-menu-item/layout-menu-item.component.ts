import { Component, inject, input, OnInit } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutRoot } from '@app/shared/view-state/view-state.models';
import { ViewStateService } from '@app/shared/view-state/view-state.service';

@Component({
  selector: 'app-layout-menu-item',
  imports: [SharedModule],
  templateUrl: './layout-menu-item.component.html',
  styleUrl: './layout-menu-item.component.scss',
})
export class LayoutMenuItemComponent implements OnInit {
  private viewStateService = inject(ViewStateService);

  layoutRoot = input.required<LayoutRoot>();
  index = input.required<number>();

  ngOnInit() {
    if (this.layoutRoot().active) {
      this.viewStateService.updateLayoutRootIndex(this.index());
    }
  }
}
