import { Component, computed, inject, input } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ViewStateService } from '@app/shared/view-state/view-state.service';
import { ContentContainerGroup } from '@app/shared/view-state/view-state.models';

import { ContentContainerComponent } from '../content-container/content-container.component';

@Component({
  selector: 'app-content-container-group',
  imports: [SharedModule, ContentContainerComponent],
  templateUrl: './content-container-group.component.html',
  styleUrl: './content-container-group.component.scss',
})
export class ContentContainerGroupComponent {
  private stateService = inject(ViewStateService);

  contentContainerGroup = input.required<ContentContainerGroup>();
  index = input.required<number>();
  layoutColumnIndex = input.required<number>();

  activeIndex = 0;

  contentContainers = computed(() => {
    // console.log('4. containers', this.contentContainerGroup().containers);
    const containers = this.contentContainerGroup().containers;
    const container = containers.find((container) => container.active);
    if (container) {
      this.activeIndex = containers.indexOf(container);
    }
    return this.contentContainerGroup().containers;
  });
}
