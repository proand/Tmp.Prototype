import { Component, computed, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutColumn } from '@app/shared/view-state/view-state.models';
import { ContentContainerGroupComponent } from '../content-container-group/content-container-group.component';

@Component({
  selector: 'app-layout-column',
  imports: [SharedModule, ContentContainerGroupComponent],
  templateUrl: './layout-column.component.html',
  styleUrl: './layout-column.component.scss',
})
export class LayoutColumnComponent {
  layoutColumn = input.required<LayoutColumn>();
  index = input.required<number>();

  contentContainerGroups = computed(() => {
    return this.layoutColumn().contentContainerGroups;
  });

  containerGroupHeight = computed(() => {
    const groups = this.contentContainerGroups();
    if (groups && groups.length === 2) {
      return '50%';
    } else {
      return '100%';
    }
  });
}
