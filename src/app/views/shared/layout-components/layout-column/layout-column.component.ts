import { Component, computed, inject, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutColumn } from '@app/shared/view-state/view-state.models';
import { ContentContainerGroupComponent } from '../content-container-group/content-container-group.component';
import { ViewStateService } from '@app/shared/view-state/view-state.service';

@Component({
  selector: 'app-layout-column',
  imports: [SharedModule, ContentContainerGroupComponent],
  templateUrl: './layout-column.component.html',
  styleUrl: './layout-column.component.scss',
})
export class LayoutColumnComponent {
  private stateService = inject(ViewStateService);

  layoutColumn = input.required<LayoutColumn>();
  index = input.required<number>();

  contentContainerGroups = computed(() => {
    // console.log('3. contentContainerGroups', this.layoutColumn().contentContainerGroups);
    return this.layoutColumn().contentContainerGroups;
  });

  containerGroupHeight = computed(() => {
    const groups = this.contentContainerGroups();
    if (groups) {
      if (groups.length === 2) {
        return '50%';
      } else {
        return '100%';
      }
    } else {
      return '100%';
    }
  });
}
