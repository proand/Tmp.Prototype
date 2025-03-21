import { Component, computed, inject, input } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { ViewStateService } from '@app/shared/view-state/view-state.service';
import { ContentContainer, ContentContainerGroup } from '@app/shared/view-state/view-state.models';

import { ContentContainerComponent } from '../content-container/content-container.component';

@Component({
  selector: 'app-content-container-group',
  imports: [SharedModule, ContentContainerComponent],
  templateUrl: './content-container-group.component.html',
  styleUrl: './content-container-group.component.scss',
})
export class ContentContainerGroupComponent {
  private stateService = inject(ViewStateService);
  private contentContainer: ContentContainer = {
    active: true,
    gisbasComponentId: this.stateService.activeGisbasComponentId(),
    domainContent: {
      id: null,
      title: null,
      shortTitle: null,
    },
  };

  contentContainerGroup = input.required<ContentContainerGroup>();
  index = input.required<number>();
  layoutColumnIndex = input.required<number>();

  contentContainers = computed(() => {
    const containers = this.contentContainerGroup().containers;

    if (containers.length > 0) {
      return containers;
    }
    return [this.contentContainer];
  });
}
