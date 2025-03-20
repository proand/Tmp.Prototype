import { Component, computed, input } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { ContentContainer } from '@app/shared/view-state/view-state.models';
import { VelkommenTilDemoComponent } from '@GISBAS_COMPONENTS/velkommen-til-demo/velkommen-til-demo.component';

import { GisbasComponentId } from '@GISBAS_CONNECT/gisbas-component-id.enum';

@Component({
  selector: 'app-content-container',
  imports: [SharedModule, VelkommenTilDemoComponent],
  templateUrl: './content-container.component.html',
  styleUrl: './content-container.component.scss',
})
export class ContentContainerComponent {
  contentContainer = input.required<ContentContainer>();
  index = input.required<number>();

  gisbasComponentId = computed(() => this.contentContainer().gisbasComponentId);
  GisbasComponentId = GisbasComponentId;
}
