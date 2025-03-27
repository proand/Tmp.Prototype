import { Component, computed, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ContentContainerGroup } from '@app/shared/view-state/models/view-state.models';
import { ContentContainerComponent } from '../content-container/content-container.component';

@Component({
  selector: 'app-content-container-group',
  imports: [SharedModule, ContentContainerComponent],
  templateUrl: './content-container-group.component.html',
  styleUrl: './content-container-group.component.scss',
})
export class ContentContainerGroupComponent {
  contentContainerGroup = input.required<ContentContainerGroup>();
  index = input.required<number>();
  layoutColumnIndex = input.required<number>();

  activeIndex = 0;

  contentContainers = computed(() => {
    const contentContainers = this.contentContainerGroup().contentContainers;
    const contentContainer = contentContainers.find((container) => container.active);

    if (contentContainer) {
      this.activeIndex = contentContainers.indexOf(contentContainer);
    }
    return this.contentContainerGroup().contentContainers;
  });
}
